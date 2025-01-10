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
  const [error, setError] = useState(''); 
  const navigate = useNavigate();


  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', { email });
      
      if (response.status === 200) {
        setStep(2); 
      } else {
        setError("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while sending the email. Please try again.",);
      console.log(error)
    }
  };

 
  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

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
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while resetting the password. Please try again.");
      console.log(error)
    }
  };

  return (
    <section className="h-screen px-4 py-20 lg:px-20 desktop:px-40 gap-6 flex justify-center items-center">
      {step === 1 && (
        <div className="bg-white w-1/2 h-full rounded-md shadow-md p-10 flex flex-col justify-around items-center gap-5">
          <h2 className="text-3xl font-bold text-violet-950">Forgot Password</h2>
          <input
            className="bg-White/95 p-3 w-10/12 rounded-md border border-violet-950"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text="Submit" Bg="bg-btn" textColor="text-white" onClick={handleEmailSubmit} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="bg-white w-1/2 h-full rounded-md shadow-md p-10 flex flex-col justify-around items-center gap-5">
          <h2 className="text-3xl font-bold text-violet-950">Enter the Verification Code</h2>
          <p>We've sent a verification code to your email address.</p>
          <input
            className="bg-White/95 p-3 w-10/12 rounded-md border border-violet-950"
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <input
            className="bg-White/95 p-3 w-10/12 rounded-md border border-violet-950"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="bg-White/95 p-3 w-10/12 rounded-md border border-violet-950"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button text="Reset Password" Bg="bg-btn" textColor="text-white" onClick={handlePasswordReset} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </section>
  );
}
