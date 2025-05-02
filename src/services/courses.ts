import { CouCard } from "../types/interfaces";
import axiosInstance from "./axiosInstance"
interface LessonFile {
    file: File;
    type: string;
  }
  
  interface Lesson {
    title: string;
    description: string;
    files: LessonFile[];
  }
  
export  interface courseDataProps {
    _method?: string; 
    duration: string;
    level: string;
    title: string;
    description: string;
    price: string;
    category_id: string;
    cover: File | null;
    lessons: Lesson[];
    rating: string;
  }

const language = localStorage.getItem('language');

export const allCourses = async () =>
{
    const respons = await axiosInstance.get(`/courses?lang=${language}`);
    console.log(respons.data.data)
    return respons.data.data;
}

export const singleCourse = async (id: number) => {
      const response = await axiosInstance.get(`/courses?lang=${language}`); 
      const selectedCourse = response.data.data.find((course: CouCard) => course.id === id);
      return selectedCourse;
};

export const  watchSingleCourse = async (id: number) => 
{
    const response = await axiosInstance.get(`/courses/${id}?lang=${language}`);
    console.log(response.data)
    return response.data.data
}

export const  watchSingleCourseInAR = async (id: number) => 
{
    const response = await axiosInstance.get(`/courses/${id}?lang=ar`);
    console.log(response.data)
    return response.data.data
}
export const  watchSingleLessonInAR = async (id: number) => 
{
    const response = await axiosInstance.get(`/lessons/${id}?lang=ar`);
    console.log(response.data)
    return response.data.data
}
export const  watchSingleCourseInEn = async (id: number) => 
{
    const response = await axiosInstance.get(`/courses/${id}?lang=en`);
    console.log(response.data)
    return response.data.data
}
export const  watchSingleLessonInEn = async (id: number) => 
    {
        const response = await axiosInstance.get(`/lessons/${id}?lang=en`);
        console.log(response.data)
        return response.data.data
    }
export const allCategories = async () =>
{
    const response = await axiosInstance.get('/categories'); 
    return response.data.data;
}


export const deleteCourse = async (id: number) => 
{
    const respons = await axiosInstance.delete(`/courses/${id}`);
    return respons.data
}

export const pendingCourse = async() => 
{
    const response = await axiosInstance.get('/pending-courses');
    console.log(response.data) 
    return response.data.data;
}

interface changeStatusProps 
{
    status : string;
    id : number
}
export const changeStatusCourse = async ({ id, status }: changeStatusProps) => {
    if (!status) {
        console.error("Status is missing!");
        return;
    }

    const response = await axiosInstance.put(`/courses/${id}/change-status`, { status });
    return response.status;
};
