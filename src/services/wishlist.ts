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

export const getWishList = async() =>
{
    try{
        const response = await axiosInstance.get('/favorites');
        console.log(response.data);
        return response.data;
    }catch (error : unknown) {
        if (error instanceof AxiosError) {
        throw error.response?.data || { message: "add failed" };
    }throw { message: "An unexpected error occurred" }; 
    }
}
export const getRecommended = async() =>
{
    try{
        const response = await axiosInstance.get('/recommended-courses');
        console.log(response.data);
        return response.data;
    }catch (error : unknown) {
        if (error instanceof AxiosError) {
        throw error.response?.data || { message: "add failed" };
    }throw { message: "An unexpected error occurred" }; 
    }
}

