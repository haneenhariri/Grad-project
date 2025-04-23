import { useEffect, useState, useRef, useCallback, useMemo, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getSecureCookie } from "../../utils/cookiesHelper";
import Pusher from "pusher-js";
import SidebarChat from "../../chat/SidebarChat";
import { TeachersProps } from "../Teachers/Teachers";
import { gitUser } from "../../services/message";

// أنواع البيانات
type Message = {
  id: number;
  sender_id: number;
  received_id: number;
  content: string;
  created_at: string;
  updated_at: string;
};

type PusherState = {
  isConnected: boolean;
  error: string | null;
  isSubscribed: boolean;
};

type PusherAction =
  | { type: 'CONNECTION_STATE_CHANGE'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RECONNECT_ATTEMPT' }
  | { type: 'SUBSCRIBED' };

// Reducer لإدارة حالة Pusher
const pusherReducer = (state: PusherState, action: PusherAction): PusherState => {
  switch (action.type) {
    case 'CONNECTION_STATE_CHANGE':
      return {
        ...state,
        isConnected: action.payload === 'connected',
        error: action.payload === 'disconnected' ? 'فقدان الاتصال بالخادم' : null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RECONNECT_ATTEMPT':
      return { ...state, error: 'جاري إعادة الاتصال...' };
    case 'SUBSCRIBED':
      return { ...state, isSubscribed: true };
    default:
      return state;
  }
};

export default function Message() {
  const { user_id } = useParams<{ user_id: string }>();
  const myUserId = Number(getSecureCookie("id"));
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState<TeachersProps | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pusherState, dispatch] = useReducer(pusherReducer, {
    isConnected: false,
    error: null,
    isSubscribed: false
  });

  // جلب بيانات المعلم
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teachers = await gitUser();
        const teacher = teachers.find((t: TeachersProps) => t.user_id === Number(user_id));
        setCurrentTeacher(teacher || null);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: "خطأ في تحميل بيانات المعلم" });
      }
    };
    if(user_id)
    {
      fetchTeacher()
    }

  }, [user_id]);

  // تهيئة Pusher والاشتراك في القناة
  useEffect(() => {
    if (!user_id || isNaN(Number(user_id))) return;

    const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY || "51cb977726ad1dd37a3b";
    const pusherCluster = import.meta.env.VITE_PUSHER_CLUSTER || "mt1";
    const pusher = new Pusher(pusherAppKey, {
      cluster: pusherCluster,
      forceTLS: true,
      authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${getSecureCookie("token")}`
        }
      }
    });

    pusher.connection.bind('state_change', (states: any) => {
      dispatch({ type: 'CONNECTION_STATE_CHANGE', payload: states.current });
    });

    const channelName = `chat.${Math.min(myUserId, Number(user_id))}.${Math.max(myUserId, Number(user_id))}`;
    const channel = pusher.subscribe(channelName);

    channel.bind('pusher:subscription_succeeded', () => {
      dispatch({ type: 'SUBSCRIBED' });
      fetchMessages();
    });

    channel.bind('new-message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user_id, myUserId]);

  // جلب الرسائل مع Pagination
  const fetchMessages = async (pageNum = 1) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/chat/${user_id}?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${getSecureCookie("token")}`
          }
        }
      );

      const result = await response.json();
      if (pageNum === 1) {
        setMessages(result.data);
      } else {
        setMessages(prev => [...result.data, ...prev]);
      }
      setHasMore(result.current_page < result.last_page);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: "تعذر تحميل الرسائل" });
    }
  };

  // إرسال رسالة جديدة مع Optimistic UI
  const sendMessage = async () => {
    if (!messageContent.trim() || !user_id) return;

    const optimisticMessage: Message = {
      id: Date.now(),
      sender_id: myUserId,
      received_id: Number(user_id),
      content: messageContent,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setMessageContent("");

    try {
      await fetch(`http://127.0.0.1:8000/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getSecureCookie("token")}`
        },
        body: JSON.stringify({
          sender_id: myUserId,
          received_id: user_id,
          content: messageContent
        })
      });

      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: "فشل إرسال الرسالة" });
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
    }
  };



  // تحميل المزيد من الرسائل عند التمرير لأعلى
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && hasMore) {
      setPage(prev => {
        const newPage = prev + 1;
        fetchMessages(newPage);
        return newPage;
      });
    }
  }, [hasMore]);

  // تنسيق وقت الرسالة
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // فرز الرسائل حسب الوقت
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [messages]);

  // إرسال بالضغط على Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (pusherState.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-red-600 text-lg font-medium mb-3">حدث خطأ</h3>
          <p className="mb-4">{pusherState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarChat />
      
      <div className="flex flex-col flex-1 border-l">
        {/* رأس المحادثة */}
        <div className="p-4 border-b flex items-center gap-3 bg-white">
          {currentTeacher && (
            <>
              <img 
                src={`http://127.0.0.1:8000/storage/${currentTeacher.profile_picture}`}
                className="w-10 h-10 rounded-full object-cover"
                alt={currentTeacher.name}
              />
              <div>
                <h2 className="font-semibold">{currentTeacher.name}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    pusherState.isConnected ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  {pusherState.isConnected ? 'متصل الآن' : 'غير متصل'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* منطقة الرسائل */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3"
          onScroll={handleScroll}
        >
          {sortedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              لا توجد رسائل بعد. ابدأ المحادثة الآن!
            </div>
          ) : (
            sortedMessages.map(msg => {
              const isMyMessage = msg.sender_id === myUserId;
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-xs lg:max-w-md ${isMyMessage ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                    {!isMyMessage && currentTeacher && (
                      <img 
                        src={`http://127.0.0.1:8000/storage/${currentTeacher.profile_picture}`}
                        className="w-8 h-8 rounded-full object-cover"
                        alt="Profile"
                      />
                    )}
                    <div className={`p-3 rounded-lg ${isMyMessage ? 'bg-violet-950 text-white' : 'bg-gray-100'}`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${isMyMessage ? 'text-violet-200' : 'text-gray-500'}`}>
                        {formatMessageTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* منطقة الإدخال */}
        <div className="p-4 border-t bg-white">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="اكتب رسالتك..."
            />
            <button
              type="submit"
              disabled={!messageContent.trim()}
              className="bg-violet-950 text-white px-4 py-2 rounded-lg hover:bg-violet-900 disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}