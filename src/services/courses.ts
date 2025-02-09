import { CouCard } from "../types/interfaces";
import axiosInstance from "./axiosInstance"
interface courseDataProps
{
    duration: string;
    level: string;
    title : string;
    description: string;
    price: string;
    cover: File | null;
    category_id : string;
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

export const AddCourse = async ( courseData : courseDataProps) => 
{
    const formData = new FormData();
    formData.append("duration", courseData.duration);
    formData.append("level" , courseData.level);
    formData.append("title" , courseData.title);
    formData.append("description" , courseData.description);
    formData.append("price" , courseData.price);
    formData.append("category_id" , courseData.category_id);
    if (courseData.cover) {
        formData.append("cover", courseData.cover)
    }
    const respons = await axiosInstance.post('/courses' ,formData ,{ headers:{"Content-Type": "multipart/form-data",}});
    return respons.data;
}

export const allCategories = async () =>
{
    const response = await axiosInstance.get('/categories'); 
    return response.data.data;
}