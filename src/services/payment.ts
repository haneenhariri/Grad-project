import axiosInstance from "./axiosInstance"

export const allPayment = async() =>
{
    const response = await axiosInstance.get('/payments/all');
    console.log(response.data);
    return response.data;
}

export const userPayment = async(lang: 'ar' | 'en') =>
{
    const response = await  axiosInstance.get(`/payments?lang=${lang}`);
    console.log(response.data);
    return response.data;
}


export const buyCourse = async(id : number) => 
{
    const response = await axiosInstance.post(`/buy-course/${id}`)
    console.log(response.data);
    return response.data;
}
