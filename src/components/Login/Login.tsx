import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import ResetPasswor from "../Popup/ResetPasswor";
import { logbtn } from "../../types/interfaces";
import { setSecureCookie } from "../../utils/cookiesHelper";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";


export default function Login({ btn }: logbtn) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      showToast('User Login successfully!', 'success'); 
      console.log("API Response:", data);
      if (data.data.token) {
        setSecureCookie("token", data.data.token);
        setSecureCookie('role', data.data.role);
        dispatch(loginSuccess(data.data.token));
        navigate("/");
      } else {
        console.error("Token is missing in the response!");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Login Error:", error.response?.data);
      showToast(`'Login Error'`, 'error');
    },
  });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
    <form onSubmit={send} className="flex flex-col mb-6">
      <label className="mb-2.5 font-medium text-base block" htmlFor="">
        {t("Email")}
      </label>
      <input
        className="w-full lg:p-5 p-2.5 mb-5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("EmailPlace")}
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <label className="mb-2.5 font-medium text-base block" htmlFor="">
        {t("Password")}
      </label>
      <input
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="mb-5 w-full lg:p-5 p-2.5 placeholder:text-base bg-White/95 rounded-md"
        placeholder={t("PasswordPlace")}
        type="password"
      />
      <button  type="button" className="block text-right md:text-base text-sm font-normal text-gray-700 mb-5" onClick={() => setShowPopup(true)}>
        {t("ForgotPassword")}
      </button>
      <button type="submit" className="w-full md:text-base text-sm text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950">
        {t(btn)}
      </button>
    </form>
    {showPopup && ( <ResetPasswor/>)}
    </>
  );
}
