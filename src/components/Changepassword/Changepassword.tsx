import { useState } from "react";
import Button from "../../Ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { changePass } from "../../services/changePassword";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";

export default function Changepassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const mutation = useMutation({
    mutationFn: changePass,
    onSuccess: () => 
    {
      showToast('Password reset successful!', 'success'); 
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      showToast('Failed to reset password. Please try', 'error'); 
      setError(error.response?.data?.message || "Failed to reset password. Please try again.");
    },
  })
  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }
    mutation.mutate({
      current_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    });
  }
  return (
    <form className=" flex flex-col justify-between " onSubmit={handlePasswordReset}>
      <div>
      <h2 className="md:text-2xl text-lg font-semibold mb-6">Change password</h2>
      <label htmlFor="currentPassword " className="mb-1.5  lg:text-base text-sm">Current Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="currentPassword"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full rounded-md border p-2 border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Password"
        />
      </div>
      <label htmlFor="newPassword" className="mb-1.5  lg:text-base text-sm">New Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md p-2 border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Password"
        />
      </div>
      <label htmlFor="confirmPassword" className="mb-1.5  lg:text-base text-sm">Confirm Password</label>
      <div className="flex justify-between gap-5 mb-5">
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
          placeholder="Confirm new password"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="">
      <Button Bg="bg-btn" textColor="text-white" text="Change Password"  />
      </div>
    </form>
  );
}
