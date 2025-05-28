import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { handleError } from "../utils/errorHandling";

export interface CommentProps {
  lesson_id: number;
  content: string;
  parentCommentId?: number; 
}

// Use environment variables for API URLs and keys
const API_URL =  "http://127.0.0.1:8000/api";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

/**
 * Add a new comment to a lesson
 */
export const addComment = async (commentData: CommentProps): Promise<CommentProps> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/comments`, commentData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to add comment"));
  }
}

/**
 * Add a reply to an existing comment
 */
export const addReply = async (commentData: CommentProps): Promise<CommentProps> => {
  try {
    // Transform parentCommentId to comment_id as expected by the server
    const apiData = {
      lesson_id: commentData.lesson_id,
      content: commentData.content,
      comment_id: commentData.parentCommentId
    };
    
    const response = await axiosInstance.post(`${API_URL}/comments`, apiData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to add reply"));
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

/**
 * Update an existing comment
 */
export const updateComment = async (commentId: number, content: string) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/comments/${commentId}`, {
      content
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to update comment"));
  }
}

/**
 * Analyze sentiment of a comment text
 */
export const analyzeComment = async (text: string): Promise<string | null> => {
  if (!GOOGLE_API_KEY) {
    console.error("Google API key is not defined");
    return null;
  }
  
  try {
    const response = await axios.post(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_API_KEY}`,
      {
        document: {
          type: "PLAIN_TEXT",
          content: text
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error analyzing sentiment:", error);
    return null;
  }
}
