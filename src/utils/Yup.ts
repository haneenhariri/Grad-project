/* import * as Yup from "yup";


export const validationSchema = Yup.object().shape({
    
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
}); */