
import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { fetchComments } from "../../redux/commentsSlice/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ReplyForm from "./ReplyForm";
import { CommentData } from "../../types/interfaces";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // استيراد أيقونات التعديل والحذف
import { getSecureCookie } from "../../utils/cookiesHelper";
import { deleteComment, updateComment } from "../../services/comments"; // استيراد دالة updateComment
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";

export default function Comment({ lesson_id }: { lesson_id: number }) {
  const { comments, loading, error } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();
  const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({});
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const {t} = useTranslation();
  // الحصول على معرف المستخدم الحالي من الكوكيز - تعديل هنا لاستخدام "id" بدلاً من "user_id"
  const currentUserId = parseInt(getSecureCookie("id") || "0");

  useEffect(() => {
    dispatch(fetchComments(lesson_id));
  }, [lesson_id, dispatch]);

  // للتأكد من أن الأيقونات تظهر، دعنا نطبع قيمة currentUserId للتحقق
  useEffect(() => {
    console.log("Current user ID:", currentUserId);
  }, [currentUserId]);

  const handleCommentAdded = () => {
    dispatch(fetchComments(lesson_id));
    setShowReplyForm({});
  };

  const toggleReplyForm = (commentId: number) => {
    setShowReplyForm(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  // دالة لتنسيق التاريخ
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // دالة لحذف تعليق
  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التعليق؟")) {
      try {
        await deleteComment(commentId);
        // إعادة تحميل التعليقات بعد الحذف
        dispatch(fetchComments(lesson_id));
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("حدث خطأ أثناء حذف التعليق");
      }
    }
  };
  
  // دالة لتعديل تعليق
  const handleEditComment = (comment: any) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };
  
  // دالة لحفظ التعليق بعد التعديل
  const handleSaveEdit = async () => {
    if (!editingComment || !editContent.trim()) return;
    
    try {
      await updateComment(editingComment, editContent);
      
      // إعادة تحميل التعليقات بعد التعديل
      dispatch(fetchComments(lesson_id));
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("حدث خطأ أثناء تعديل التعليق");
    }
  };
  
  // دالة لإلغاء التعديل
  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  // Render a reply and its nested replies recursively
  const renderReplyRecursive = (reply: any, depth: number = 0) => {
    const userName = reply.user?.name || 'User';
    const firstLetter = userName.charAt(0).toUpperCase();
    const hasProfilePicture = reply.user?.profile_picture && reply.user.profile_picture !== 'profile/default.jpg';
    
    // تعديل هنا: نطبع معرف المستخدم للتحقق
    console.log("Reply user_id:", reply.user_id, "Current user ID:", currentUserId);
    const isCurrentUserComment = reply.user_id === currentUserId;
    
    // توليد لون عشوائي ثابت بناءً على اسم المستخدم
    const getColorFromName = (name: string) => {
      const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
        'bg-red-500', 'bg-purple-500', 'bg-pink-500', 
        'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };
    
    const avatarColor = getColorFromName(userName);
    const hasNestedReplies = reply.replies && reply.replies.length > 0;
    
    return (
      <div key={reply.id} className={`pb-2 ${depth > 0 ? 'ml-5 pl-5 border-l ' : ''}`}>
        <div className="flex items-start gap-3">
          {hasProfilePicture ? (
            <img 
              src={`http://127.0.0.1:8000/storage/${reply.user.profile_picture}`} 
              alt={userName} 
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = `w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-medium`;
                  fallback.textContent = firstLetter;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-medium`}>
              {firstLetter}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm">{userName}</h4>
              {reply.user?.role === 'admin' && (
                <span className="bg-violet-100 text-violet-800 text-xs px-2 py-0.5 rounded">ADMIN</span>
              )}
              <span className="text-xs text-gray-500">{formatDate(reply.created_at)}</span>
              
              {/* أزرار التعديل والحذف للمستخدم الحالي فقط */}
              {isCurrentUserComment && (
                <div className="flex items-center gap-2 ml-auto">
                  <button 
                    onClick={() => handleEditComment(reply)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="تعديل"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteComment(reply.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="حذف"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            
            {editingComment === reply.id ? (
              <div className="mb-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent text-sm"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={handleCancelEdit}
                    className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    {t("cancel")}
                  </button>
                  <button 
                    onClick={handleSaveEdit}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t("Save")}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
            )}
            
            <button 
              onClick={() => toggleReplyForm(reply.id)}
              className="text-gray-500 text-xs font-medium hover:text-violet-600 flex items-center gap-1"
            >
              {t("REPLY")}
            </button>
            
            {showReplyForm[reply.id] && (
              <div className="mt-3">
                <ReplyForm 
                  parentComment={{
                    ...reply,
                    lesson_id: lesson_id
                  }} 
                  onReplyAdded={handleCommentAdded} 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Render nested replies recursively */}
        {hasNestedReplies && (
          <div className="mt-3">
            {reply.replies.map((nestedReply: any) => renderReplyRecursive(nestedReply, depth + 1))}
          </div>
        )}
      </div>
    );
  };
  
  // Render a comment with its replies
  const renderComment = (comment: CommentData) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const userName = comment.user?.name || 'User';
    const firstLetter = userName.charAt(0).toUpperCase();
    const hasProfilePicture = comment.user?.profile_picture && comment.user.profile_picture !== 'profile/default.jpg';
    
    // تعديل هنا: نطبع معرف المستخدم للتحقق
    console.log("Comment user_id:", comment.user_id, "Current user ID:", currentUserId);
    const isCurrentUserComment = comment.user_id === currentUserId;
    
    // توليد لون عشوائي ثابت بناءً على اسم المستخدم
    const getColorFromName = (name: string) => {
      const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
        'bg-red-500', 'bg-purple-500', 'bg-pink-500', 
        'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };
    
    const avatarColor = getColorFromName(userName);
    
    return (
      <div key={comment.id} className="py-5 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start gap-3">
          {hasProfilePicture ? (
            <div className="relative">
              <img 
                src={`http://127.0.0.1:8000/storage/${comment.user.profile_picture}`} 
                alt={userName} 
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = `w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-medium`;
                    fallback.textContent = firstLetter;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          ) : (
            <div className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-medium`}>
              {firstLetter}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{userName}</h3>
              {comment.user?.role === 'admin' && (
                <span className="bg-violet-100 text-violet-800 text-xs px-2 py-0.5 rounded">ADMIN</span>
              )}
              <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
              
              {/* أزرار التعديل والحذف للمستخدم الحالي فقط */}
              {isCurrentUserComment && (
                <div className="flex items-center gap-2 ml-auto">
                  <button 
                    onClick={() => handleEditComment(comment)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="تعديل"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="حذف"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            
            {editingComment === comment.id ? (
              <div className="mb-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={handleCancelEdit}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    {t("cancel")}
                  </button>
                  <button 
                    onClick={handleSaveEdit}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t("Save")}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 mb-3">{comment.content}</p>
            )}
            
            <button 
              onClick={() => toggleReplyForm(comment.id)}
              className="text-gray-500 text-xs font-medium hover:text-violet-600 flex items-center gap-1"
            >
              {t("REPLY")}
            </button>
            
            {showReplyForm[comment.id] && (
              <div className="mt-3">
                <ReplyForm 
                  parentComment={comment} 
                  onReplyAdded={handleCommentAdded} 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Display replies */}
        {hasReplies && (
          <div className="mt-4 ml-5 pl-8 border-l border-gray-200 space-y-0">
            {comment.replies.map(reply => renderReplyRecursive(reply, 0))}
          </div>
        )}
      </div>
    );
  };
  
  // Render all comments
  const renderComments = () => {
    if (!comments || comments.length === 0) {
      return (
        <div className="py-10 text-center">
          {/* استبدال أيقونة FiMessageCircle بعنصر HTML بسيط */}
          <div className="mx-auto text-gray-300 text-4xl mb-3 w-16 h-16 flex items-center justify-center border-2 border-gray-200 rounded-full">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-gray-500">{t("No comments yet. Be the first to comment!")}</p>
        </div>
      );
    }
    
    // Filter main comments (those without a comment_id)
    const mainComments = comments.filter(comment => 
      comment && comment.content && !comment.comment_id
    );
    
    return (
      <div className="divide-y divide-gray-200">
        {mainComments.map(comment => renderComment(comment))}
      </div>
    );
  };

  return (
    <div className="rounded-lg ">
      <h2 className="text-xl font-semibold mb-6">{t("Comments")}</h2>
      {loading ? (
        <div className="py-10 text-center">
          <Spinner/>
        </div>
      ) : error ? (
        
        <div className="py-10 text-center">
          <p className="text-red-500">Error loading comments: {error}</p>
        </div>
      ) : (
        renderComments()
      )}
            <AddComment lesson_id={lesson_id} onCommentAdded={handleCommentAdded} />

    </div>
  );
}
