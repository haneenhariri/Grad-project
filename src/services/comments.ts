import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export interface commentProps {
  lesson_id: number;
  content: string;
  parentCommentId?: number; 
}
const API_URL = "http://127.0.0.1:8000/api";
const googleApiKey = "AIzaSyDQ7S--6X5jLVEQ3qrrrLcqn3_AnKah8BA";

export const addComment = async (commentData: commentProps) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/comments`, commentData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { message: "add failed" };
    }
    throw { message: "An unexpected error occurred" }; 
  }
}

// إضافة دالة addReply للرد على التعليقات
export const addReply = async (commentData: commentProps) => {
  try {
    // تحويل parentCommentId إلى comment_id كما يتوقع الخادم
    const apiData = {
      lesson_id: commentData.lesson_id,
      content: commentData.content,
      comment_id: commentData.parentCommentId // تغيير اسم المعلمة ليتوافق مع الخادم
    };
    
    const response = await axiosInstance.post(`${API_URL}/comments`, apiData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { message: "reply failed" };
    }
    throw { message: "An unexpected error occurred" }; 
  }
}

// إضافة دالة لحذف التعليق
export const deleteComment = async (commentId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/comments/${commentId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { message: "delete failed" };
    }
    throw { message: "An unexpected error occurred" }; 
  }
}

// إضافة دالة لتعديل التعليق
export const updateComment = async (commentId: number, content: string) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/comments/${commentId}`, {
      content
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { message: "update failed" };
    }
    throw { message: "An unexpected error occurred" }; 
  }
}

// تحليل المشاعر للتعليق
export const analyzeComment = async (text: string) => {
  try {
    const response = await axios.post(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleApiKey}`,
      {
        document: {
          type: "PLAIN_TEXT",
          content: text
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return null;
  }
}
