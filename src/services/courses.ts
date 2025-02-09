import { CouCard } from "../types/interfaces";
import axiosInstance from "./axiosInstance"

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

