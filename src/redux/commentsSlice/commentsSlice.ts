import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { CommentUser } from "../../components/Comment/Comment";

interface Comment {
  id: number;
  content: string;
  user : CommentUser[];
  replies: Comment[];
}

interface CommentsState {
  comments: Comment[];
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
    console.log(response.data.data.comments)
    return response.data.data.comments;
  }
);
export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async ({ lesson_id, content }: { lesson_id: number; content: string }) => {
    const response = await axiosInstance.post('/comments', {
      lesson_id,
      content,
    });
    return response.data.data;
  }
);
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // جلب التعليقات
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'فشل في تحميل التعليقات';
      })
      
      // إضافة تعليق
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload); // إضافة التعليق الجديد في الأعلى
      });
  },
});

export default commentsSlice.reducer;