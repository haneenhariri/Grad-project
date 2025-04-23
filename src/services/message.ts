import axiosInstance from "./axiosInstance"

export const gitUser = async () => 
{
    const response = await axiosInstance.get(`/student-instructors`);
    console.log(response.data.data);
    return response.data.data;
}