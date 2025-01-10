import { useState } from "react";
import Button from "../../Ui/Button/Button";
import axios from "axios";

export default function Changepassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post('http://localhost:8000/api/change-password', {
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      if (response.status === 200) {
        alert("Password reset successful!");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <form className="w-1/2" onSubmit={handlePasswordReset}>
      <h2 className="text-2xl font-semibold mb-6">Change password</h2>
      <label htmlFor="currentPassword" className="mb-1.5">Current Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="currentPassword"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Password"
        />
      </div>
      <label htmlFor="newPassword" className="mb-1.5">New Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Password"
        />
      </div>
      <label htmlFor="confirmPassword" className="mb-1.5">Confirm Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Confirm new password"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button Bg="bg-btn" textColor="text-white" text="Change Password"  />
    </form>
  );
}
