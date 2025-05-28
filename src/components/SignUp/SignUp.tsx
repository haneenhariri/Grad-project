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
import Input from "../../Ui/Input/Input";

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
        .oneOf([Yup.ref('password')], t("PasswordsMatch")) 
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
            <Input placeholder={t("NamePlace")} type="text"  rest ={register("name")} error={errors.name?.message}/>
            <Label label="Email"/>
            <Input placeholder={t("EmailPlace")} type="email"  rest ={register("email")} error={errors.email?.message}/>
            <Label label="Password"/>
            <Input placeholder={t("PasswordPlace")} type="password"  rest ={register("password")} error={errors.password?.message}/>
            <Label label="Confirm"/>
            <Input placeholder={t("Confirm")} type="password"  rest ={register("password_confirmation")} error={errors.password_confirmation?.message}/>
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
