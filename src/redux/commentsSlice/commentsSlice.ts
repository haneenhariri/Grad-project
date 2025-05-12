
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { CommentData } from "../../types/interfaces";

interface CommentsState {
  comments: CommentData[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (lesson_id: number) => {
    const response = await axiosInstance.get(
      `http://127.0.0.1:8000/api/lessons/${lesson_id}?lang=ar`
    );
    return response.data.data.comments;
  }
);
export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async ({ lesson_id, content, parentCommentId }: { 
    lesson_id: number; 
    content: string;
    parentCommentId?: number | null;
  }) => {
    // إنشاء كائن البيانات الأساسي
    const commentData: any = {
      lesson_id,
      content
    };
    
    // إضافة comment_id فقط إذا كان موجودًا (للردود)
    if (parentCommentId) {
      commentData.comment_id = parentCommentId;
    }
    
    const response = await axiosInstance.post('/comments', commentData);
    return response.data.data;
  }
);
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        
        // لا نحتاج لإضافة التعليق يدويًا هنا لأننا سنقوم بإعادة تحميل التعليقات
        // بعد إضافة تعليق جديد أو رد جديد
      });
  },
});

export default commentsSlice.reducer;
