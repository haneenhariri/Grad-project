import { useState } from "react";
import Button from "../../Ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "../../services/forgotPassword";
import { showToast } from "../../utils/toast";


export default function ResetPasswor() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [showPopup,setShowPopup] = useState(true)
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
            showToast('Login Error', 'error');
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
            setShowPopup(false)           
          },
          onError: (error: any) => {
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
    <div className={`${showPopup == true ? 'block' : 'hidden' } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50`}> 
        <form  onSubmit={(e) => {
        e.preventDefault();}} className="bg-white w-max  rounded-md shadow-md md:p-10 p-2.5  flex flex-col justify-around  gap-5">
        <h2 className="md:text-3xl sm:text-lg text-sm font-bold text-violet-950">Reset Password</h2>
        {step === 1 && (
          <>
            <div>
            <label className="mb-2.5 font-medium md:text-3xl sm:text-lg text-sm   block" htmlFor="">
              Email
            </label>
            <input
                className="bg-White/95 p-3  md:w-72 w-[240px] rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <Button text="Submit" Bg="bg-btn" textColor="text-white" type='button' onClick={handleEmailSubmit} />
            </div>
            </>
        )}
        {step === 2 && (
          <>                  
          <p className=" text-center md:text-base text-sm">We've sent a verification code to your email address.</p>
                  <input
                    className="bg-White/95 p-3  w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <input
                    className="bg-White/95 p-3  w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    className="bg-White/95 p-3  w-full rounded-md border sm:text-base text-sm placeholder:sm:text-base placeholder:text-sm border-violet-950"
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div>
                  <Button text="Reset Password" Bg="bg-btn" textColor="text-white" onClick={handlePasswordReset} />
                  </div>
                  </>
        )}
        </form>

    </div>
  )
}
