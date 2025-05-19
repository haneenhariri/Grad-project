import axiosInstance from "./axiosInstance"

const URL = "/admin/dashboard"
export const generalStats = async () => 
{
    const response = await axiosInstance.get(`${URL}/general-stats`);
    return response.data.data;
}

export const revenueStats = async (period: string) => 
{
    const response = await axiosInstance.get(`${URL}/revenue-stats?period=${period}`);
    return response.data.data;
}