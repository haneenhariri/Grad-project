import { useState } from "react";
import Button from "../../Ui/Button/Button";
import TextareaAutosize from 'react-textarea-autosize';
import {  analyzeComment } from "../../services/comments";
import { useAppDispatch } from "../../hooks/hooks";
import { addNewComment } from "../../redux/commentsSlice/commentsSlice";
import { AddCommentProps } from "../../types/interfaces";


export default function AddComment({ lesson_id, onCommentAdded }: AddCommentProps) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('type any thing to send');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const analysisResult = await analyzeComment(comment);
      const sentimentScore = analysisResult?.documentSentiment?.score;
      if (sentimentScore !== undefined && sentimentScore < -0.5) {
        setError("يرجى كتابة تعليق مناسب.");
        setLoading(false);
        return;
      }
      await dispatch(
        addNewComment({ lesson_id, content: comment })
      ).unwrap();

      setComment('');
      onCommentAdded(); 
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ أثناء الإرسال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-4 items-start">
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError(''); 
          }}          
          className="w-11/12 px-4 py-2 border rounded-md focus:outline-btn placeholder:text-gray-400"
          placeholder="Write your comment"
        />
        <Button
          type="submit"
          Bg="w-1/5 bg-btn text-white  !text-xl"
          text={loading ? "Posting..." : "Post Comment"}
          disabled={loading}
        />
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
