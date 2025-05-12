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
        console.log("API response from profile:", response.data);
        
        // نتحقق من وجود البيانات في الهيكل المتوقع
        if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        
        return [];
    } catch (error) {
        console.error("Error fetching my courses:", error);
        throw error;
    }
}

export const EditProfile = async (profileData: any) => {
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


export const EditProfileInst = async (profileData: any) => {
  try {
    const formData = new FormData();
    
    if (profileData.name) formData.append('name', profileData.name);
    if (profileData.email) formData.append('email', profileData.email);
    if (profileData.profile_picture) formData.append('profile_picture', profileData.profile_picture);
    if (profileData.education) formData.append('education', profileData.education);
    if (profileData.specialization) formData.append('specialization', profileData.specialization);
    if (profileData.summery) formData.append('summery', profileData.summery);
    if (profileData._method) formData.append('_method', profileData._method);
    
    const response = await axiosInstance.post('/instructor/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error updating instructor profile:", error);
    throw error;
  }
}
