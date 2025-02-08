import axiosInstance from "./axiosInstance";
interface ChangePassProps
{
    current_password:string;
    new_password: string;
    new_password_confirmation:string;
}
export const changePass = async(PassChang : ChangePassProps) =>
{
    const respons = await axiosInstance.post('/change-password' , PassChang);
    return respons.data
}