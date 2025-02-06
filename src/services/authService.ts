import axios from "axios";
import { Credentials, UserData } from "../types/interfaces";
import axiosInstance from "./axiosInstance";

const API_URL = "http://127.0.0.1:8000/api";

export const login  = async (credentials: Credentials) => 
{
    const respons = await axios.post(`${API_URL}/login` , credentials);
    return respons.data; 
};
export const signup = async (userData :UserData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const logout = async ()=> 
{
    const respons = await axiosInstance.post('/logout');
    return respons.data;
}