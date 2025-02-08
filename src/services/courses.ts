import axiosInstance from "./axiosInstance"

export const allCourses = async () =>
{
    const respons = await axiosInstance.get('courses');
    return respons.data.data;
}

export const fetchCourse = async (courseId: number) => {
    const response = await axiosInstance.get(`courses/${courseId}`);
    return response.data.data;
  };
  