import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { logbtn } from "../../types/interfaces";
import { setSecureCookie } from "../../utils/cookiesHelper";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";

export default function SignUp({btn} : logbtn) {
    const [formData, setFormData] = useState({name:"", email: "", password: "" ,password_confirmation: ""});
    const {t} = useTranslation()
    const navigate = useNavigate();
    const mutation = useMutation(
      {
        mutationFn : signup,
        onSuccess: (data) => {
          if(data.data.token)
          {
            setSecureCookie('token', data.data.token);
            setSecureCookie('role', data.data.role);
            navigate('/auth/login');
          }else {
            console.error("Token is missing in the response!");
          }
        },
        onError: (error: AxiosError<{ message?: string }>) => {
          console.error("Login Error:", error.response?.data);
          showToast('Login Error', 'error');
        },
      });
    const send = (e : React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData)
      };
  return (
    <form className="md:mb-6 " onSubmit={send}>
      <label className='mb-2.5 font-medium text-base block' htmlFor="name">{t("Name")}</label>
      <input
        className="w-full mb-5 lg:p-5 p-2.5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("NamePlace")}
        type="text"
        defaultValue={formData.name}
        onChange={(e) => setFormData( {...formData, name: e.target.value})}
      />
      <label className='mb-2.5 font-medium text-base block' htmlFor="email">{t("Email")}</label>
      <input
        className="w-full mb-5 lg:p-5 p-2.5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("EmailPlace")}
        type="email"
        defaultValue={formData.email}
        onChange={(e) => setFormData({ ...formData, email:e.target.value})}
      />
      
      <div className=" my-5 flex lg:flex-row flex-col gap-2">
      <div>
      <label className='mb-2.5 font-medium text-base block' htmlFor="">{t("Password")}</label>
      <input defaultValue={formData.password}
      onChange={(e) => setFormData({...formData, password:e.target.value})} 
      className=" w-full lg:p-5 p-2.5 placeholder:text-base bg-White/95 rounded-md" placeholder={t("PasswordPlace")} type="text" />
      </div>
      <div>
      <label className='mb-2.5 font-medium text-base block' htmlFor="">Confirm Password</label>
        <input 
        defaultValue={formData.password_confirmation}
        onChange={(e) => setFormData({...formData, password_confirmation:e.target.value})}
        className=" w-full lg:p-5 p-2.5 placeholder:text-base bg-White/95 rounded-md" placeholder={'Confirm Password'} type="text" />
      </div>
      </div>
      <p className="block  text-sm font-normal text-gray-700 mb-5" > <input type="checkbox" name="" id="" /> {t("I agree with Terms of Use and Privacy Policy")}</p>
      <button className="w-full text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950">{t(btn)}</button>
    </form>
  )
} 

