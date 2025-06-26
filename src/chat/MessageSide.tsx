import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageProps, PusherMessageEvent } from "../types/interfaces";
import { getSecureCookie } from "../utils/cookiesHelper";
import { getMessages, sendMessageUser } from "../services/message";
import { showToast } from "../utils/toast";
import simplePusherService from "../services/simplePusherService"; // استخدام خدمة Pusher المبسطة
import HeadChat from "./HeadChat";
import SendMessage from "./SendMessage";
import MessageList from "../components/Message/MessageList";
import Spinner from "../components/Spinner/Spinner";

export default function MessageSide() {
  const { user_id } = useParams<{ user_id: string }>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);

  const myUserId = parseInt(getSecureCookie("id") || "0");
  const otherUserId = parseInt(user_id || "0");

  // تحديد معلومات المستلم
  const receiver =
    messages.length > 0
      ? messages[0].sender_id === otherUserId
        ? messages[0].sender
        : messages[0].received
      : null;

  // جلب الرسائل
  const fetchMessages = useCallback(async () => {
    if (!otherUserId) return;

    setLoading(true);
    try {
      const response = await getMessages(otherUserId);
      console.log("Messages response:", response);

      // التعامل مع الهيكل الجديد للبيانات
      let messagesData: MessageProps[] = [];

      if (response && response.data) {
        // الحالة 1: الرسائل موجودة في data.messages (الهيكل الجديد)
        if (response.data.messages && Array.isArray(response.data.messages)) {
          messagesData = response.data.messages;
        }
        // الحالة 2: الرسائل موجودة مباشرة في data (الهيكل القديم)
        else if (Array.isArray(response.data)) {
          messagesData = response.data;
        }
        // الحالة 3: الرسائل موجودة في data.data (هيكل آخر محتمل)
        else if (response.data.data && Array.isArray(response.data.data)) {
          messagesData = response.data.data;
        }
      }

      console.log("Processed messages data:", messagesData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      showToast("Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  }, [otherUserId]);

  // جلب الرسائل عند تحميل المكون
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // الاستماع للرسائل الجديدة باستخدام Pusher
  useEffect(() => {
    if (!myUserId) return;

    console.log(`Setting up Pusher connection for user ${myUserId}`);

    // بدء اتصال Pusher
    const success = simplePusherService.startUserConnection(myUserId);
    console.log(`Pusher connection setup ${success ? "successful" : "failed"}`);

    // معالج استلام الرسائل الجديدة
    const handleNewMessage = (data: PusherMessageEvent) => {
      console.log("Received message in component:", data);

      // التحقق من وجود الرسالة
      if (!data.message) {
        console.error("Invalid message data received:", data);
        return;
      }

      // تحديد ما إذا كانت الرسالة موجهة لهذا المستخدم
      if (data.received && data.received.id === myUserId) {
        console.log("Adding new message from other user to chat");

        // إنشاء كائن الرسالة الجديدة
        const newMessage: MessageProps = {
          id: Date.now(),
          content: data.message,
          sender_id: otherUserId,
          received_id: myUserId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sender: {
            id: otherUserId,
            name: data.received?.name || "",
            profile_picture: data.received?.profile_picture || "",
          },
          received: {
            id: myUserId,
          },
        };

        // إضافة الرسالة الجديدة إلى حالة المكون
        setMessages((prevMessages) => {
          console.log("Updating messages state with new message");
          return [...prevMessages, newMessage];
        });
      } else {
        console.log("Message not intended for this conversation");
      }
    };

    // تسجيل معالج الرسائل
    const unsubscribe = simplePusherService.onMessageReceived(
      myUserId,
      handleNewMessage
    );

    // تنظيف عند إزالة المكون
    return () => {
      console.log("Cleaning up Pusher connection");
      unsubscribe();
      simplePusherService.unsubscribeFromChannel(myUserId);
    };
  }, [myUserId, otherUserId]);

  // إرسال رسالة جديدة
  const handleSendMessage = async (content: string): Promise<void> => {
    try {
      // إرسال الرسالة إلى الخادم
      await sendMessageUser(otherUserId, content);

      // إضافة الرسالة إلى القائمة المحلية
      const newMessage: MessageProps = {
        id: Date.now(),
        content,
        sender_id: myUserId,
        received_id: otherUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sender: {
          id: myUserId,
        },
        received: receiver || {
          id: otherUserId,
          name: "",
          profile_picture: "",
        },
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Failed to send message", "error");
      throw error;
    }
  };

  return (
    <div className="flex w-full flex-col h-[calc(100vh-40px)] bg-gradient-to-b from-gray-50 to-white shadow-lg overflow-hidden">
      {/* رأس المحادثة */}
      {receiver && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <HeadChat
            image={
              receiver?.profile_picture
                ? `/storage/${receiver.profile_picture}`
                : ""
            }
            name={receiver?.name || ""}
          />
        </div>
      )}

      {/* محتوى المحادثة */}
      <div className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Spinner />
              <p className="text-gray-500 text-sm">Loading messages...</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Chat Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
              ></div>
            </div>

            <MessageList messages={messages} myUserId={myUserId} />
          </div>
        )}
      </div>

      {/* مكون إرسال الرسائل */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <SendMessage receiverId={otherUserId} onSend={handleSendMessage} />
      </div>
    </div>
  );
}
