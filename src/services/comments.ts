import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export interface commentProps
{
    lesson_id: number;
    content: string;
    parentCommentId?: number; 

}
const API_URL = "http://127.0.0.1:8000/api";
const googleApiKey = "AIzaSyDQ7S--6X5jLVEQ3qrrrLcqn3_AnKah8BA";

export const addComment = async (commentData : commentProps ) =>
{
    try{
        const response = await axiosInstance.post(`${API_URL}/comments`, commentData);
        return response.data;
    }catch (error : unknown) {
            if (error instanceof AxiosError) {
                throw error.response?.data || { message: "add failed" };
            }
            throw { message: "An unexpected error occurred" }; 
    }
}

export const analyzeComment = async ( text : string) => 
{
    try{
        const res = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${googleApiKey}` , 
            {
                document: {
                type: "PLAIN_TEXT",
                content: text,
                },
                encodingType: "UTF8",
            });
            return res.data;
    }catch (error) {
        console.error("Error analyzing comment:", error);
        throw error;}
}