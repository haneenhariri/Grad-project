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
export const allCourses = async () =>
{
    const respons = await axiosInstance.get('/courses');
    console.log(respons.data.data)
    return respons.data.data;
}
export const singleCourse = async (id: number) => {
      const response = await axiosInstance.get('/courses'); 
      const selectedCourse = response.data.data.find((course: CouCard) => course.id === id);
      return selectedCourse;
};

export const AddCourse = async (courseData: courseDataProps) => {
    const formData = new FormData();
  
    // إضافة البيانات الأساسية للكورس
    formData.append("duration", courseData.duration);
    formData.append("level", courseData.level);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    formData.append("category_id", courseData.category_id);
  
    // إضافة صورة الغلاف إذا كانت موجودة
    if (courseData.cover) {
      formData.append("cover", courseData.cover);
    }
  
    // إضافة الدروس وملفاتها
    courseData.lessons.forEach((lesson, lessonIndex) => {
      formData.append(`lessons[${lessonIndex}][title]`, lesson.title);
      formData.append(`lessons[${lessonIndex}][description]`, lesson.description);
  
      lesson.files.forEach((fileData, fileIndex) => {
        if (fileData.file) {
          formData.append(`lessons[${lessonIndex}][files][${fileIndex}][path]`, fileData.file);
          formData.append(`lessons[${lessonIndex}][files][${fileIndex}][type]`, fileData.type || "file"); // نوع الملف الافتراضي
        }
      });
    });
  
    try {
      const response = await axiosInstance.post('/courses', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  };
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
