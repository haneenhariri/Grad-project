import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import ResetPasswor from "../Popup/ResetPasswor";

interface logbtn {
  btn: string;
}

export default function Login({ btn }: logbtn) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("API Response:", data);
      console.log("API Response:", data.data.token);
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem('role', data.data.role);
        dispatch(loginSuccess(data.data.token)); 
        console.log("Stored Token:", localStorage.getItem("token"));
        navigate("/");
      } else {
        console.error("Token is missing in the response!");
      }
    },
    onError: (error: any) => {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
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
      <button type="submit" className="w-full text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950">
        {t(btn)}
      </button>
    </form>
    {showPopup && ( <ResetPasswor/>)}
    </>
  );
}
