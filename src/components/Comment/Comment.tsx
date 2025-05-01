import { useEffect } from "react";
import AddComment from "./AddComment";
import { fetchComments } from "../../redux/commentsSlice/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import chat from '../../assets/ChatsCircle (1).png'
interface Comment {
  id: number;
  content: string;
  user : CommentUser[];
  replies: Comment[];
}
export interface CommentUser {
  name:  string;  
  profile_picture: string;
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
/*   const renderReplies = (replies: Comment[]) => {
    return replies
      .filter(reply => reply && reply.content) // تأكد من وجود reply وcontent
      .map((reply) => (
        <div key={reply.id} className="ml-4 mt-2">
          <p className="font-semibold">{reply.content}</p>
          {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies)}
        </div>
      ));
  }; */
  
  const renderComments = () => {
    return comments
      .filter(comment => comment && comment.content) // تأكد من وجود comment وcontent
      .map((comment) => (
        <div key={comment.id} className="flex items-start gap-4 my-4">
          <img className=" w-10 h-10 object-cover  rounded-full" src={`http://127.0.0.1:8000/storage/${comment.user.profile_picture}`} alt="" />
          <div className=" flex flex-col gap-3">
            <h3 className="font-semibold text-base">{comment.user.name}</h3>
            <p className=" text-gray-700 font-medium">{comment.content}</p>
            <div className=" flex items-center gap-2">
              <img src={chat} alt="" />
              <p className=" text-[#8C94A3]">REPLY</p>
            </div>
          </div>
          
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
