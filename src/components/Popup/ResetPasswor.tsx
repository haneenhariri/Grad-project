import { useState } from "react";
import Button from "../../Ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "../../services/forgotPassword";
import { showToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Label from "../../Ui/Label/Label";
import Input from "../../Ui/Input/Input";


export default function ResetPasswor() {
    const {t} = useTranslation();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
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
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")],t("PasswordsDoNotMatch") )
          .required(t("RequiredField"))
    });
    const {
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });
    const mutation = useMutation(
        {
          mutationFn : forgotPassword,
          onSuccess: (data) => 
          {
            console.log(data.message);
            setStep(2);
          },
          onError: (error: AxiosError<{ message?: string }>) => 
          {
            console.error(" Error:", error.response?.data);
            showToast('Reset Password Error', 'error');
          }
        }
      )

      const handleEmailSubmit = () => {
        mutation.mutate({email})
      };
      const mutationResetPassword = useMutation(
        {
          mutationFn: resetPassword,
          onSuccess: (data) => 
          {
            showToast(`${data.message}`, 'success'); 
            navigate("/auth/login");
          },
          onError: (error: AxiosError<{ message?: string }>) => {
            console.error("Reset Password Error:", error.response?.data);
            showToast('Failed to reset password.', 'error');
          },
        }
      )
      const handlePasswordReset = () => {
        if (newPassword !== confirmPassword) {
          showToast('Passwords do not match!', 'error');
          
          return;
        }
    
      mutationResetPassword.mutate({
        email,
        token: verificationCode,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
    
      }
    
  return (
    <div className={`desktop:w-[41.25%] lg:w-[50%] w-full desktop:p-12.5 md:p-10 p-5  desktop:rounded-xl md:rounded-[10px] bg-white`}> 
        <form   onSubmit={handleSubmit(step === 1 ? handleEmailSubmit : handlePasswordReset)} >
      <div className=" text-center mb-10">
        <h2 className=" font-semibold lg:text-4xl md:text-2xl text-lg mb-2">
          {step === 1 ? `${t('ResetPassword')}` : `${t('ResetPasswordT')}`}
        </h2>
        <p className=" md:text-base text-sm font-normal">
          { step === 1 ? `${t('ResetPasswordP')}` : `${t('ResetPassword2')}`}
         </p>
      </div>
      {step === 1 && (
          <>
            <div>
            <Label label={t("Email")} />
            <Input type="email" error={errors.email?.message} name="email" placeholder={t("EmailPlace")} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
            <Button text="Next" Bg="bg-btn" textColor="w-full my-4 md:text-base text-sm text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950" type='button' onClick={handleEmailSubmit} />
            </div>
            </>
        )}
        {step === 2 && (
          <>
            <Label label={t("RecoveryCode")} />            
            <Input type="text" placeholder={t("Enter verification code")} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <Label label={t("Password")} />
            <Input type="password" error={errors.password?.message} placeholder={t("New Password")} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Label label={t("Confirm")} />
            <Input type="password" error={errors.confirmPassword?.message} placeholder={t("Confirm New Password")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <div>
                <Button text="ResetPassword" Bg="bg-btn" textColor="w-full my-4 md:text-base text-sm text-white lg:py-4.5 lg:px-5 p-2.5 rounded-lg bg-violet-950" onClick={handlePasswordReset} />
            </div>
          </>
        )}
        </form>
    </div>
  )
}
