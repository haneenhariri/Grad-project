import { useState } from "react";
import { analyzeComment } from "../../services/comments";
import { useAppDispatch } from "../../hooks/hooks";
import { addNewComment } from "../../redux/commentsSlice/commentsSlice";
import { AddCommentProps } from "../../types/interfaces";
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from "react-i18next";

export default function AddComment({ lesson_id, parentCommentId = null, onCommentAdded }: AddCommentProps) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Please type something to send');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // تحليل المشاعر للتعليق
      const analysisResult = await analyzeComment(comment);
      const sentimentScore = analysisResult?.documentSentiment?.score;
      
      if (sentimentScore !== undefined && sentimentScore < -0.5) {
        setError("يرجى كتابة تعليق مناسب.");
        setLoading(false);
        return;
      }
      
      // إضافة التعليق
      await dispatch(
        addNewComment({ 
          lesson_id, 
          content: comment,
          parentCommentId 
        })
      ).unwrap();

      setComment('');
      onCommentAdded();
    } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('حدث خطأ أثناء الإرسال');
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex  gap-3">
        <TextareaAutosize
          minRows={1}
          maxRows={5}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError(''); 
          }}          
          className="w-10/12 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent"
          placeholder={t("Write your comment...")}
        />
        <div className="flex w-1/6 justify-between items-center">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="ml-auto w-full h-full px-5 py-2 bg-btn text-white text-lg font-medium rounded-md hover:bg-violet-950 transition-colors disabled:opacity-50"
          >
          {loading ? t("btn.Posting...") : t("btn.Post")}
          </button>
        </div>
      </form>
    </div>
  );
}
