import axios from "axios";

interface InstDataProps {
  name: string;
  email: string;
  password: string;
  education: string;
  specialization: string;
  summery: string;
  cv: File | null;
}

const API_URL = "http://127.0.0.1:8000/api";

export const submitTeacherForm = async (InstData: InstDataProps) => {
  const formData = new FormData();
  formData.append("name", InstData.name);
  formData.append("email", InstData.email);
  formData.append("password", InstData.password);
  formData.append("education", InstData.education);
  formData.append("specialization", InstData.specialization);
  formData.append("summery", InstData.summery);
  
  if (InstData.cv) {
    formData.append("cv", InstData.cv);
  }

  const response = await axios.post(`${API_URL}/requests`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
