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
      showToast(t('Password reset successful!'), 'success'); 
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      showToast(t('Failed to reset password. Please try again.'), 'error'); 
      setError(error.response?.data?.message || "Failed to reset password. Please try again.");
    },
  })
/**
 * Handles the password reset form submission.
 * Prevents default form behavior and checks if the new password matches the confirmation.
 * If passwords match, initiates a mutation to change the password.
 * Displays an error message if the passwords do not match.
 *
 * @param e - The form submission event.
 */

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError(t("PasswordsMatch"));
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
      <Input   type="password" placeholder={t("Current Password")}  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
      <Label label="New Password" />
      <Input type="password" placeholder={t("New Password")} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      <Label  label="Confirm New Password"/>
      <Input type="password" placeholder={t("Confirm New Password")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <Button Bg="bg-btn" textColor="text-white w-max" text="Change password"  />
    </form>
  );
}
