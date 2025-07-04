import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { logbtn } from "../../types/interfaces";
import { setSecureCookie } from "../../utils/cookiesHelper";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";
import Spinner from "../Spinner/Spinner";
import Label from "../../Ui/Label/Label";
import Input from "../../Ui/Input/Input";

export default function Login({ btn }: logbtn) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const userName = data.data.user?.name || t("User"); // الاحتياط إذا لم يكن هناك اسم
      showToast(`${t("logIn.Welcome")}, ${userName}!`, "success");
      if (data.data.token) {
        setSecureCookie("token", data.data.token);
        setSecureCookie("role", data.data.role);
        setSecureCookie("id", data.data.user.id.toString());
        dispatch(loginSuccess(data.data.token));
        navigate("/");
      } else {
        console.error("Token is missing in the response!");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Login Error:", error.response?.data);
      showToast("Login Error", "error");
    },
  });
  if (mutation.isPending) {
    return <Spinner />;
  }
  const onSubmit = (formData: { email: string; password: string }) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-6">
        <Label label="Email" />
        <Input
          rest={register("email")}
          error={errors.email?.message}
          type={"email"}
          placeholder={t("EmailPlace")}
        />
        <Label label="Password" />
        <Input
          rest={register("password")}
          error={errors.password?.message}
          type={"password"}
          placeholder={t("PasswordPlace")}
        />
        <NavLink
          className="block text-right md:text-base text-sm font-normal text-gray-700 mb-5"
          to={"/auth/forgot"}
        >
          {" "}
          {t("ForgotPassword")}
        </NavLink>
        <button
          type="submit"
          className="w-full md:text-base text-sm text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950"
        >
          {t(btn)}
        </button>
      </form>
    </>
  );
}
