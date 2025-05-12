import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const addReview = async (courseId: number, rating: number, review: string) => {
  try {
    const response = await axiosInstance.post(`/rates`, {
      course_id: courseId,
      rate:rating,
      review:review
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { message: "add failed" };
    }
    throw { message: "An unexpected error occurred" }; 
  }
}