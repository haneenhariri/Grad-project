import { useEffect, useRef } from 'react';
import { MessageProps } from '../../types/interfaces';

interface MessageListProps {
  messages: MessageProps[];
  myUserId: number;
}

export default function MessageList({ messages, myUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // إضافة سجل للتشخيص
  useEffect(() => {
    console.log('MessageList received messages:', messages);
  }, [messages]);
  

  
  // التحقق من أن messages هي مصفوفة
  if (!Array.isArray(messages)) {
    console.error('Expected messages to be an array but got:', messages);
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-center text-gray-500">لا توجد رسائل للعرض</p>
      </div>
    );
  }
  
  // إذا كانت المصفوفة فارغة
  if (messages.length === 0) {
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-center text-gray-500">ابدأ محادثة جديدة</p>
      </div>
    );
  }
  
  // تجميع الرسائل حسب التاريخ
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, MessageProps[]>);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f1cff594] text-rose-600 text-xs px-3 py-1 rounded-full">
              {new Date(date).toLocaleDateString()}
            </div>
          </div>
          
          {dateMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender_id === myUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender_id === myUserId 
                    ? 'bg-[#f1cff594] text-gray-800 rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p>{message.content}</p>
                <div 
                  className={`text-xs mt-1 ${
                    message.sender_id === myUserId ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}





