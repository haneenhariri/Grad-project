import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToast } from '../utils/toast';
import { MessageProps } from '../types/interfaces';
import { getSecureCookie } from '../utils/cookiesHelper';
import { sendMessageUser } from '../services/message';

interface SendMessageProps {
  receiverId: number;
  onMessageSent: (message: MessageProps) => void;
}

export default function SendMessage({ receiverId, onMessageSent }: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();
  const myUserId = parseInt(getSecureCookie('id') || '0');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setSending(true);
    try {
      const response = await sendMessageUser(receiverId, message);
      console.log('Message sent successfully:', response);
      
      // إنشاء كائن الرسالة الجديدة
      const newMessage: MessageProps = {
        id: Date.now(), // سيتم استبداله بالمعرف الفعلي من الخادم إذا كان متاحًا
        content: message,
        sender_id: myUserId,
        received_id: receiverId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sender: {
          id: myUserId,
          name: getSecureCookie('name') || '',
          profile_picture: getSecureCookie('profile_picture') || ''
        },
        received: {
          id: receiverId,
          name: '', // سيتم ملؤها لاحقًا إذا كانت متاحة
          profile_picture: ''
        }
      };
      
      // استدعاء الدالة المرجعية لتحديث واجهة المستخدم
      onMessageSent(newMessage);
      
      // مسح حقل الإدخال
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast(t('Failed to send message'), 'error');
    } finally {
      setSending(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('Type a message...')}
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          disabled={sending}
        />
        <button
          type="submit"
          className="bg-violet-900 text-white rounded-r-lg px-4 py-2 hover:bg-violet-800 transition-colors disabled:bg-violet-300"
          disabled={sending || !message.trim()}
        >
          {sending ? t('Sending...') : t('Send')}
        </button>
      </div>
    </form>
  );
}