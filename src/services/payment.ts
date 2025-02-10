import axiosInstance from "./axiosInstance"

export const allPayment = async() =>
{
    const response = await axiosInstance.get('/payments/all');
    console.log(response.data);
    return response.data;
}

export const userPayment = async() =>
{
    const response = await  axiosInstance.get('/payments');
    console.log(response.data);
    return response.data;
}

