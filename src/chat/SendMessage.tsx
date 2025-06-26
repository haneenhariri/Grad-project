import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPaperPlane } from "react-icons/fa";

interface SendMessageProps {
  receiverId: number;
  onSend: (content: string) => Promise<void>;
}

export default function SendMessage({ receiverId, onSend }: SendMessageProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !receiverId) return;

    try {
      setSending(true);
      await onSend(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 py-3 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all duration-200">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("Type a message...")}
              className="flex-1 px-4 py-3 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] placeholder-gray-500"
              disabled={sending}
              rows={1}
              style={{
                height: "auto",
                minHeight: "44px",
                maxHeight: "128px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 128) + "px";
              }}
            />
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${
            message.trim() && !sending
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={sending || !message.trim()}
        >
          {sending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaPaperPlane className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}
