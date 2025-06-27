import { useEffect, useRef } from "react";
import { MessageProps } from "../../types/interfaces";

interface MessageListProps {
  messages: MessageProps[];
  myUserId: number;
}

export default function MessageList({ messages, myUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // إضافة سجل للتشخيص
  useEffect(() => {
    console.log("MessageList received messages:", messages);
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // التحقق من أن messages هي مصفوفة
  if (!Array.isArray(messages)) {
    console.error("Expected messages to be an array but got:", messages);
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-gray-500">Unable to load messages</p>
        </div>
      </div>
    );
  }

  // إذا كانت المصفوفة فارغة
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-10 h-10 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Start a conversation
          </h3>
          <p className="text-gray-500 text-sm">
            Send a message to begin chatting
          </p>
        </div>
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

  // Helper function to check if messages are consecutive from same sender
  const isConsecutiveMessage = (
    currentMsg: MessageProps,
    prevMsg: MessageProps | null
  ) => {
    if (!prevMsg) return false;
    return (
      currentMsg.sender_id === prevMsg.sender_id &&
      new Date(currentMsg.created_at).getTime() -
        new Date(prevMsg.created_at).getTime() <
        60000
    ); // Within 1 minute
  };

  return (
    <div
      ref={scrollContainerRef}
      className="absolute inset-0 overflow-y-auto px-4 py-2 scrollbar-thin"
      style={{ scrollBehavior: "smooth" }}
    >
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="mb-6">
          {/* Date Separator */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/80 backdrop-blur-sm text-gray-600 text-xs px-4 py-2 rounded-full shadow-sm border border-gray-200">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {dateMessages.map((message, index) => {
            const isMyMessage = message.sender_id === myUserId;
            const prevMessage = index > 0 ? dateMessages[index - 1] : null;
            const isConsecutive = isConsecutiveMessage(message, prevMessage);

            return (
              <div
                key={message.id}
                className={`flex mb-2 ${
                  isMyMessage ? "justify-end" : "justify-start"
                } ${isConsecutive ? "mb-1" : "mb-3"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[60%] ${
                    isMyMessage
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100"
                  } ${
                    isConsecutive
                      ? "rounded-2xl"
                      : isMyMessage
                      ? "rounded-2xl rounded-tr-md"
                      : "rounded-2xl rounded-tl-md"
                  } px-4 py-3 relative group transition-all duration-200 hover:shadow-md`}
                >
                  {/* Message Content */}
                  <p className="text-sm leading-relaxed break-words">
                    {message.content}
                  </p>

                  {/* Message Footer */}
                  <div
                    className={`flex items-center justify-end gap-1 mt-2 ${
                      isMyMessage ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Message Tail */}
                  {!isConsecutive && (
                    <div
                      className={`absolute top-0 w-3 h-3 ${
                        isMyMessage
                          ? "right-0 bg-gradient-to-r from-purple-500 to-pink-500"
                          : "left-0 bg-white border-l border-t border-gray-100"
                      } transform rotate-45 ${
                        isMyMessage ? "translate-x-1/2" : "-translate-x-1/2"
                      } -translate-y-1/2`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
