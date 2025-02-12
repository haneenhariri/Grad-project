import axiosInstance from "./axiosInstance"

export const allUserStd = async() => 
{
    const respons = await axiosInstance.get('/get-students');
    return respons.data;
}