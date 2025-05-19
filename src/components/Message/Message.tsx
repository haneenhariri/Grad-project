import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getSecureCookie } from "../../utils/cookiesHelper";
import { format } from 'date-fns';
import { useTranslation } from "react-i18next";
import { showToast } from "../../utils/toast";
import SidebarChat from "../../chat/SidebarChat";
import { MessageProps } from "../../types/interfaces";
import Spinner from "../Spinner/Spinner";
import HeadChat from "../../chat/HeadChat";
import SendMessage from "../../chat/SendMessage";
import Pusher from "pusher-js";
import echo from "../../utils/echo";

export default function Message() {
  const { user_id } = useParams<{ user_id: string }>();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const myUserId = parseInt(getSecureCookie('id') || '0');
  const otherUserId = parseInt(user_id || '0');
  const receiver = messages[0]?.received_id === otherUserId 
    ? messages[0]?.received 
    : messages[0]?.sender;

  // تنسيق التاريخ
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  }, []);

  // تنسيق الوقت
  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  }, []);

  // إضافة دالة لجلب الرسائل
  const fetchMessages = useCallback(async () => {
    if (!otherUserId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/chat/${otherUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getSecureCookie('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched messages:', data);
      
      if (data && data.data) {
        setMessages(data.data);
        
        // التمرير إلى أسفل بعد تحميل الرسائل
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      showToast(t('Failed to load messages'), 'error');
    } finally {
      setLoading(false);
    }
  }, [otherUserId, t]);

  // إضافة useEffect لجلب الرسائل عند تحميل المكون
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
useEffect(() => {
  console.log('Initializing Pusher directly with:', {
    pusherKey: '387e77ddfcfe5e1abfd9',
    pusherCluster: 'eu'
  });
  
  const token = getSecureCookie('token');
  
  const pusher = new Pusher('387e77ddfcfe5e1abfd9', {
    cluster: 'eu',
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    auth: {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  });
  
  pusher.connection.bind('state_change', (states) => {
    console.log('Pusher connection:', states.previous + ' -> ' + states.current);
  });
  
  const channelName = `private-chat.user.${myUserId}`;
  console.log('Subscribing to channel:', channelName);
  
  const channel = pusher.subscribe(channelName);
  
  channel.bind('pusher:subscription_succeeded', () => {
    console.log('Successfully subscribed to channel:', channelName);
  });
  
  channel.bind('pusher:subscription_error', (error) => {
    console.error('Subscription error:', error);
  });
  
  // استمع إلى الحدث الصحيح (message.sent)
  channel.bind('message.sent', (data) => {
    console.log('Received message event:', data);
    
    // تأكد من أن البيانات صالحة
    if (data) {
      const newMessage = {
        id: Date.now(),
        content: data.message,
        sender_id: data.sender.id,
        received_id: myUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sender: data.sender,
        received: { id: myUserId, name: getSecureCookie('name') }
      };
      
      console.log('Adding new message to state:', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // التمرير إلى أسفل بعد استلام رسالة جديدة
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  });
  
  return () => {
    console.log('Cleaning up Pusher connection');
    channel.unbind_all();
    pusher.unsubscribe(channelName);
  };
}, [myUserId]);

  // أضف هذا الكود للتحقق من الأحداث الواردة
  useEffect(() => {
    // تسجيل جميع الأحداث الواردة من Pusher للتصحيح
    if (!myUserId) return;
    
    const token = getSecureCookie('token');
    const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY || '387e77ddfcfe5e1abfd9';
    const pusherCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER || 'eu';
    
    console.log('DEBUG: Creating debug Pusher connection');
    
    // إنشاء اتصال Pusher للتصحيح
    const debugPusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
      forceTLS: true,
      authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      enableLogging: true
    });
    
    // الاستماع لجميع الأحداث
    debugPusher.connection.bind('connected', () => {
      console.log('DEBUG: Debug Pusher connected');
      
      // الاشتراك في القناة الخاصة
      const channelName = `private-chat.user.${myUserId}`;
      console.log(`DEBUG: Subscribing to ${channelName}`);
      
      const channel = debugPusher.subscribe(channelName);
      
      // تسجيل جميع الأحداث
      channel.bind_global((eventName, data) => {
        console.log(`DEBUG: Event received: ${eventName}`, data);
      });
    });
    
    return () => {
      debugPusher.disconnect();
    };
  }, [myUserId]);

  // تجميع الرسائل حسب التاريخ
  const groupedMessages = useMemo(() => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {} as Record<string, MessageProps[]>);
  }, [messages]);

  const handleMessageSent = useCallback((newMessage: MessageProps) => {
    console.log('Message sent callback:', newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // التمرير إلى أسفل
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="flex">
      <SidebarChat/>
      <div className="flex w-full flex-col h-[calc(100vh-100px)] bg-white border shadow-md overflow-hidden">
        {/* رأس المحادثة */}
        {receiver?.profile_picture ? (
          <HeadChat 
            image={`http://127.0.0.1:8000/storage/${receiver?.profile_picture}`} 
            name={receiver.name}
          />
        ) : (
          <HeadChat image={''} name={receiver?.name} />
        )}
        
        {/* محتوى المحادثة */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 p-4 overflow-y-auto"
        >
          {loading ? (
            <Spinner/>
          ) : (
            <>
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date} className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-violet-100 text-violet-800 text-xs px-3 py-1 rounded-full">
                      {formatDate(date)}
                    </div>
                  </div>
                  
                  {dateMessages.map((message, index) => {
                    const isMyMessage = message.sender_id === myUserId;
                    const showAvatar = index === 0 || 
                      dateMessages[index - 1].sender_id !== message.sender_id;
                    const otherUser = isMyMessage ? message.received : message.sender;
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        <div className={`flex ${isMyMessage ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                          {!isMyMessage && showAvatar && (
                            <div className="flex-shrink-0">
                              {otherUser?.profile_picture ? (
                                <img 
                                  src={`http://127.0.0.1:8000/storage/${otherUser.profile_picture}`}
                                  className="w-8 h-8 rounded-full object-cover"
                                  alt={otherUser.name}
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-gray-600 text-xs font-semibold">
                                    {otherUser?.name?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <div 
                            className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                              isMyMessage 
                                ? 'bg-violet-900 text-white rounded-tr-none' 
                                : 'bg-gray-100 rounded-tl-none'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 text-right ${
                              isMyMessage ? 'text-orange-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        <SendMessage receiverId={otherUserId} onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
}
