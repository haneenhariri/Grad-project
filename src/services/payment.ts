import axiosInstance from "./axiosInstance"

export const allPayment = async() =>
{
    const response = await axiosInstance.get('/payments/all');
    console.log(response.data);
    return response.data;
}