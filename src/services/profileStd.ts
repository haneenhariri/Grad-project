
import axiosInstance from "./axiosInstance";


export const imgProfile= async () => 
{
    const respons = await axiosInstance.get('/profile')
    return respons.data;
}