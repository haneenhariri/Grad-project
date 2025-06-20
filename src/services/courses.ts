import {  myCourseProp } from "../types/interfaces";
import { handleError } from "../utils/errorHandling";
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
    main_category_name?:string;
  }


export const allCourses = async (lang: 'ar' | 'en'): Promise<courseDataProps[]> => {
  try {
    const response = await axiosInstance.get(`/courses?lang=${lang}`);
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, 'Failed to fetch courses'));
  }
};

export const singleCourse = async (id: number , language: 'ar' | 'en' ) => {
      const response = await axiosInstance.get(`/public-courses/${id}?lang=${language}`); 
      return response.data.data;
};

export const  watchSingleCourse = async (id: number , language : 'ar' | 'en') => 
{
    const response = await axiosInstance.get(`/courses/${id}?lang=${language}`);
    console.log(response.data)
    return response.data.data
}


export const allCategories = async () =>
{
    const response = await axiosInstance.get('/categories'); 
    return response.data.data;
}
export const fetchSingleCourse = async (id: number) => 
{
    const response = await axiosInstance.get(`/multilingual/courses/${id}`);
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

export const updateCourseData = async ({courseData , courseId} : { courseData : myCourseProp ; courseId : number }) => {
  try{
    const formData = new FormData();
    if(courseData.cover){
      formData.append('cover', courseData.cover);
    }
    formData.append('_method', 'PUT');
    formData.append('duration', courseData.duration);
    formData.append('level', courseData.level);
    formData.append('title[en]', courseData.title.en);
    formData.append('title[ar]', courseData.title.ar);
    formData.append('description[en]', courseData.description.en);
    formData.append('description[ar]', courseData.description.ar);
    formData.append('sub_category_id', courseData.subCategory_id);
    formData.append('price', courseData.price);
    formData.append('course_language', courseData.course_language);
   
    const response = await axiosInstance.post(`/multilingual/courses/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;

  }catch (error) {
    console.error("Error updating instructor profile:", error);
    throw error;
  }
}
