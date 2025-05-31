import { useState } from "react";
import Button from "../../Ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { changePass } from "../../services/changePassword";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import Label from "../../Ui/Label/Label";
import Input from "../../Ui/Input/Input";

export default function Changepassword() {
  const {t} = useTranslation();
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
      <h2 className="md:text-2xl text-lg font-semibold mb-6">{t("Change password")}</h2>
      <Label label="Current Password"/>
      <Input  type="password" placeholder={t("Current Password")}  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
      <Label label="New Password" />
      <Input type="password" placeholder={t("New Password")} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      <Label  label="Confirm New Password"/>
      <Input type="password" placeholder={t("Confirm New Password")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="">
      <Button Bg="bg-btn" textColor="text-white" text="Change password"  />
      </div>
    </form>
  );
}
