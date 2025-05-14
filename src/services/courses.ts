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

export const allCourses = async (lang: 'ar' | 'en') =>
{
    const respons = await axiosInstance.get(`/courses?lang=${lang}`);
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

export const updateCourseData = async ({courseData , courseId} : any) => {
  try{
    const formData = new FormData();
    if(courseData.cover){
      formData.append('cover', courseData.cover);
    }
    formData.append('_method', 'PUT');
    formData.append('duration', courseData.duration);
    formData.append('level', courseData.level);
    formData.append('title[en]', courseData.titleEn);
    formData.append('title[ar]', courseData.titleAr);
    formData.append('description[en]', courseData.descriptionEn);
    formData.append('description[ar]', courseData.descriptionAr);
    formData.append('sub_category_id', courseData.subCategory_id);
    formData.append('price', courseData.price);
    formData.append('course_language', courseData.courseLanguage);
   
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