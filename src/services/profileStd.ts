import { profileDataProps } from "../types/interfaces";
import axiosInstance from "./axiosInstance";

export const imgProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw error;
  }
};

export const fetchMyCourses = async() => 
{
    try {
        const response = await axiosInstance.get('/profile');
        console.log("API response from profile:", response.data.data.courses);
        
        if (response.data && Array.isArray(response.data.data.courses)) {
            return response.data.data.courses;
        }
        
        return [];
    } catch (error) {
        console.error("Error fetching my courses:", error);
        throw error;
    }
}

export const EditProfile = async (profileData: profileDataProps) => {
  try {
    const formData = new FormData();

    if (profileData.profile_picture) {
      formData.append('profile_picture', profileData.profile_picture);
    }
    if (profileData.name) formData.append('name', profileData.name);
    if (profileData.email) formData.append('email', profileData.email);

    const response = await axiosInstance.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};


export const EditProfileInst = async (formData: profileDataProps) => {
  try {
    const response = await axiosInstance.post("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
  } catch (error) {
    console.error("Error updating instructor profile:", error);
    throw error;
  }
}
