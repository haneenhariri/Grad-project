import { useState } from "react";
import Button from "../../Ui/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', { email });
      
      if (response.status === 200) {
        setStep(2); 
      } 
    } catch (error) {
      console.log(error)
    }
  };

  const handlePasswordReset = async () => {

    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        email : email,
        token : verificationCode,  
        password : newPassword,    
        password_confirmation: confirmPassword,
      });

      if (response.status === 200) {
        alert("Password reset successful!");
        navigate('/auth/login'); 
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.log(error)
    }
  };

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
