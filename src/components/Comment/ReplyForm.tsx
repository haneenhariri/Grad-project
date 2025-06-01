import { useState } from "react";
import { addReply, analyzeComment } from "../../services/comments";
import { ReplyProps } from "../../types/interfaces";
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from "react-i18next";

export default function ReplyForm({ parentComment, onReplyAdded }: ReplyProps) {
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reply.trim()) {
      setError('Please type something to reply');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // تحليل المشاعر للتعليق
      const analysisResult = await analyzeComment(reply);
      const sentimentScore = analysisResult?.documentSentiment?.score;
      
      if (sentimentScore !== undefined && sentimentScore < -0.5) {
        setError("يرجى كتابة رد مناسب.");
        setLoading(false);
        return;
      }
      
      // إرسال الرد
      await addReply({
        lesson_id: parentComment.lesson_id,
        content: reply,
        parentCommentId: parentComment.id
      });
      
      setReply('');
      onReplyAdded();
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ أثناء إرسال الرد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
            setError('');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent text-sm"
          placeholder={t("Write your reply...")}
        />
        <div className="flex justify-between items-center">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="ml-auto px-4 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-md hover:bg-violet-700 transition-colors disabled:opacity-50"
          >
            {loading ? t("Posting...") : t("REPLY")}
          </button>
        </div>
      </form>
    </div>
  );
}



