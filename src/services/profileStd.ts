import { EditProfileInstProps, EditProfileProps } from "../types/interfaces";
import axiosInstance from "./axiosInstance";

export const imgProfile= async () => 
{
    const respons = await axiosInstance.get('/profile');
    console.log(respons.data.data)
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
export const EditProfileInst= async (information : EditProfileInstProps) => 
    {
        const formData = new FormData();
        formData.append("name", information.name);
        formData.append("email", information.email);
        formData.append("education", information.education);
        formData.append("specialization", information.specialization);
        formData.append("summery", information.summery);
        
        if (information.profile_picture) {
            formData.append("profile_picture", information.profile_picture)
        }
        const respons = await axiosInstance.post('/profile' ,formData ,{ headers:{"Content-Type": "multipart/form-data",}});
        return respons.data;
    }
export const fetchMyCourses = async() => 
{
    const respons = await axiosInstance.get('/profile');
    console.log(respons.data.data.courses)
    return respons.data.data.courses;
}
