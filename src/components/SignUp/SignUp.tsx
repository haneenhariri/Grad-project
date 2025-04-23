import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { logbtn } from "../../types/interfaces";
import { setSecureCookie } from "../../utils/cookiesHelper";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";
import Spinner from "../Spinner/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Label from "../../Ui/Label/Label";

export default function SignUp({ btn }: logbtn) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
    
        name: Yup.string().required(t("RequiredField")),
        email: Yup.string()
        .email(t("InvalidEmail"))
        .matches(
            /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|io|dev|info|me|co|sa|eg)$/i,
            t("InvalidEmail")
        )
        .required(t("RequiredField")),
        password: Yup.string()
        .min(8, t("PasswordTooShort"))
        .required(t("RequiredField")),
        password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], "PasswordsMatch") 
        .required(t("RequiredField")),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
      });
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
    const onSubmit = (data: { name: string; email: string; password: string; password_confirmation: string }) => {
        mutation.mutate(data);
      };

    return (
        <form className="md:mb-6" onSubmit={handleSubmit(onSubmit)}>
            <Label label="Name"/>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("NamePlace")}
                type="text"
                {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
            <Label label="Email"/>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("EmailPlace")}
                type="email"
                {...register("email")}

            />
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
            <Label label="Password"/>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("PasswordPlace")}
                type="password"
                {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
            <Label label="Confirm"/>
            <input
                className="w-full mb-5 lg:p-5 p-2.5 bg-White/95 rounded-md"
                placeholder={t("Confirm")}
                {...register("password_confirmation")}
                type="password"
                 />
            {errors.password_confirmation && <p className="text-red-500 text-sm mb-2">{errors.password_confirmation.message}</p>}
            {mutation.isError && <p className="text-red-500">Signup Failed!</p>}
            <p className="text-sm font-normal text-gray-700 mb-5">
                <input type="checkbox" /> {t("agree")}
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
