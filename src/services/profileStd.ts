import { EditProfileProps } from "../types/interfaces";
import axiosInstance from "./axiosInstance";

export const imgProfile= async () => 
{
    const respons = await axiosInstance.get('/profile');
    return respons.data;
}
export const EditProfile= async (information : EditProfileProps) => 
{
    const formData = new FormData();
    formData.append("name", information.name);
    formData.append("email", information.email);
    
    if (information.profile_picture) {
        formData.append("profile_picture", information.profile_picture)
    }
    const respons = await axiosInstance.post('/profile' ,formData ,{ headers:{"Content-Type": "multipart/form-data",}});
    return respons.data;
}

export const fetchMyCourses = async() => 
{
    const respons = await axiosInstance.get('/profile');
    return respons.data.courses;
}