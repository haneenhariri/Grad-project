import axios from "axios";
import { email, ResetPassword } from "../types/interfaces";

const API_URL = "http://127.0.0.1:8000/api";

export const forgotPassword = async ( data: email) =>
{
    const respons = await axios.post(`${API_URL}/forgot-password` , data);
    return respons.data;
};

export const resetPassword = async (data: ResetPassword) =>
{
    const respons = await axios.post(`${API_URL}/reset-password` , data);
    return respons.data
}
