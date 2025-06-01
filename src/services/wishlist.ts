import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance"

export const  addWishCourse = async (id : number) => 
{
    try{
        const response = await axiosInstance.post(`/favorites/${id}`);
        console.log(response.data)
        return response.data;
    }catch (error : unknown) {
        if (error instanceof AxiosError) {
        throw error.response?.data || { message: "add failed" };
        }
            throw { message: "An unexpected error occurred" }; 
        }
}

export const getWishList = async(lang: 'ar' | 'en') =>
{
    try{
        const response = await axiosInstance.get(`/favorites?lang=${lang}`);
        return response.data.data;
    }catch (error : unknown) {
        if (error instanceof AxiosError) {
        throw error.response?.data || { message: "add failed" };
    }throw { message: "An unexpected error occurred" }; 
    }
}
export const getResults = async() =>
{
    try
    {
        const response = await axiosInstance.get(`/student/dashboard/exam-results`);
        return response.data.data;
    }catch(error)
    {
        console.log(error);
    }
}
export const getRecommended = async(lang: 'ar' | 'en') =>
{
    try{
        const response = await axiosInstance.get(`/recommended-courses?lang=${lang}`);
        console.log(response.data);
        return response.data;
    }catch (error : unknown) {
        if (error instanceof AxiosError) {
        throw error.response?.data || { message: "add failed" };
    }throw { message: "An unexpected error occurred" }; 
    }
}

