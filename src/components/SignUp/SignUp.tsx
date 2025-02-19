import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { logbtn } from "../../types/interfaces";
import { setSecureCookie } from "../../utils/cookiesHelper";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";
import Spinner from "../Spinner/Spinner";

export default function SignUp({ btn }: logbtn) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { t } = useTranslation();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            if (data.data.token) {
                setSecureCookie("token", data.data.token);
                setSecureCookie("role", data.data.role);
                navigate("/auth/login");
            } else {
                console.error("Token is missing in the response!");
            }
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            console.error("Signup Error:", error.response?.data);
            showToast("Signup Error", "error");
        },
    });
    if (mutation.isPending) {
      return <Spinner/>;
    }
    const send = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            showToast("All fields are required!", "error");
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <form className="md:mb-6" onSubmit={send}>
            <label className="mb-2.5 font-medium md:text-base text-sm block">
                {t("Name")}
            </label>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("NamePlace")}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <label className="mb-2.5 font-medium md:text-base text-sm block">
                {t("Email")}
            </label>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("EmailPlace")}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label className="mb-2.5 font-medium md:text-base text-sm block">
                {t("Password")}
            </label>
            <input
                className="w-full lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("PasswordPlace")}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <label className="mb-2.5 font-medium md:text-base text-sm block">
                Confirm Password
            </label>
            <input
                className="w-full lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder="Confirm Password"
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                    setFormData({ ...formData, password_confirmation: e.target.value })
                }
            />
            {mutation.isError && <p className="text-red-500">Signup Failed!</p>}

            <p className="text-sm font-normal text-gray-700 mb-5">
                <input type="checkbox" /> {t("I agree with Terms of Use and Privacy Policy")}
            </p>

            <button
                className="w-full text-white lg:py-4.5 lg:px-5 p-2.5 md:text-base text-sm rounded-lg bg-violet-950"
                disabled={mutation.isPending}
            >
                {t(btn)}
            </button>
        </form>
    );
}
