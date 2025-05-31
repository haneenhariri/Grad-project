import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SendMessageProps {
  receiverId: number;
  onSend: (content: string) => Promise<void>;
}

export default function SendMessage({ receiverId, onSend }: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !receiverId) return;
    
    try {
      setSending(true);
      await onSend(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('Type a message...')}
          className="flex-1 p-2 border border-gray-300  ltr:rounded-l-lg rtl:rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#f3c2f894]"
          disabled={sending}
        />
        <button
          type="submit"
          className="bg-[#f2b3fa94] border-gray-300  border px-4  py-2 ltr:rounded-r-lg rtl:rounded-l-lg hover:bg-[#f2b3fa94] focus:ring-2  "
          disabled={sending || !message.trim()}
        >
          {sending ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span>{t('Send')}</span>
          )}
        </button>
      </div>
    </form>
  );
}
