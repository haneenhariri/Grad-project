import { useState } from "react";
import Button from "../../Ui/Button/Button";
import {  useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "../../services/forgotPassword";

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useMutation(
    {
      mutationFn : forgotPassword,
      onSuccess: (data) => 
      {
        console.log(data.message);
        setStep(2);
      },
      onError: (error: any) => 
      {
        console.error("Login Error:", error.response?.data);
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
        alert(data.message);
        navigate("/auth/login");
      },
      onError: (error: any) => {
        console.error("Reset Password Error:", error.response?.data);
        alert("Failed to reset password.");
      },
    }
  )
  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
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
    <section className=" px-4 desktop:py-28 md:py-20 py-10 lg:px-20 desktop:px-40 gap-6 flex justify-center items-center">
      {step === 1 && (
        <div className="bg-white lg:w-1/2  rounded-md shadow-md md:p-10 p-5  flex  desktop:gap-y-20 gap-y-14 flex-col justify-around items-center gap-5">
          <h2 className="sm:text-3xl text-lg font-bold text-violet-950">Forgot Password</h2>
          <input
            className="bg-White/95 p-3 sm:w-10/12 w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text="Submit" Bg="bg-btn" textColor="text-white" onClick={handleEmailSubmit} />
        </div>
      )}

      {step === 2 && (
        <div className="bg-white lg:w-1/2  rounded-md shadow-md md:p-10 p-5  flex flex-col justify-around items-center gap-5">
          <h2 className="sm:text-3xl text-center text-lg font-bold text-violet-950">Enter the Verification Code</h2>
          <p className=" text-center md:text-base text-sm">We've sent a verification code to your email address.</p>
          <input
            className="bg-White/95 p-3 sm:w-10/12 w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <input
            className="bg-White/95 p-3 sm:w-10/12 w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="bg-White/95 p-3 sm:w-10/12 w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button text="Reset Password" Bg="bg-btn" textColor="text-white" onClick={handlePasswordReset} />
        </div>
      )}
    </section>
  );
}
