import { useEffect } from "react";
import AddComment from "./AddComment";
import { fetchComments } from "../../redux/commentsSlice/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
interface Comment {
  id: number;
  content: string;
  replies: Comment[];
}
export default function Comment({lesson_id} : { lesson_id: number }) {
  const { comments, loading, error } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(lesson_id));
  }, [lesson_id, dispatch]);
  const handleCommentAdded = () => {
    dispatch(fetchComments(lesson_id));
  };
  const renderReplies = (replies: Comment[]) => {
    return replies
      .filter(reply => reply && reply.content) // تأكد من وجود reply وcontent
      .map((reply) => (
        <div key={reply.id} className="ml-4 mt-2">
          <p className="font-semibold">{reply.content}</p>
          {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
        </div>
      ));
  };
  
  const renderComments = () => {
    return comments
      .filter(comment => comment && comment.content) // تأكد من وجود comment وcontent
      .map((comment) => (
        <div key={comment.id} className="my-4">
          <p className="font-semibold">{comment.content}</p>
          {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies)}
        </div>
      ));
  };
  return (
    <div className=' mt-10 w-full'>
      <h2>Comments (154)</h2>
      {loading && <p>جاري تحميل التعليقات...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && renderComments()}
      <AddComment lesson_id={lesson_id} onCommentAdded={handleCommentAdded} />
    </div>
  )
}
