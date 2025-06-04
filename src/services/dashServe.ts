import axiosInstance from "./axiosInstance"

const URL = "/admin/dashboard"
const URLINST = "/instructor/dashboard"
export const generalStats = async () => 
{
    const response = await axiosInstance.get(`${URL}/general-stats`);
    return response.data.data;
}
export const generalStatsInstracror = async () => 
{
    const response = await axiosInstance.get(`${URLINST}/general-stats`);
    return response.data.data;
}
export const ratingsStats = async () =>
{
    const response = await axiosInstance.get(`${URLINST}/ratings`);
    return response.data.data;
}
export const revenueStats = async (period: string) => 
{
    const response = await axiosInstance.get(`${URL}/revenue-stats?period=${period}`);
    return response.data.data;
}

const STD_URL = "/student/dashboard"
export const studentStats = async () => 
{
    const response = await axiosInstance.get(`${STD_URL}/general-stats`);
    return response.data.data;
}