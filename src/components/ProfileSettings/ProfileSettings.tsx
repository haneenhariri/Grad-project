import { useState } from "react";
import Button from "../../Ui/Button/Button";
import Changepassword from "../Changepassword/Changepassword";
import { useMutation } from "@tanstack/react-query";
import { EditProfile } from "../../services/profileStd";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";
import { useTranslation } from "react-i18next";
import Label from "../../Ui/Label/Label";
import Input from "../../Ui/Input/Input";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchProfile } from "../../redux/profileSlice/profileSlice";
interface profileProps {
  name?: string;
  email?: string;
  profile_picture?: File;
}
export default function ProfileSettings() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: EditProfile,
    onSuccess: () => {
      showToast(t('Profile updated successfully'), 'success');
      setName("");
      setEmail("");
      setImage(undefined);
      setPreview(null);
      dispatch(fetchProfile());
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Error updating profile:", error);
      showToast(error.response?.data?.message || "Error updating profile", 'error');
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file); 
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // إنشاء كائن البيانات فقط مع الحقول التي تم تغييرها
    const profileData: profileProps = {};
    
    if (name) profileData.name = name;
    if (email) profileData.email = email;
    if (image) profileData.profile_picture = image;
    
    // التحقق من وجود بيانات للإرسال
    if (Object.keys(profileData).length === 0) {
      showToast(t('No changes to update'), 'info');
      return;
    }
    
    // إرسال البيانات
    mutation.mutate(profileData);
  };

  return (
    <>
      <div className=" flex  flex-col  gap-5 rounded-md p-5 ">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6">{t("navigation.Settings")}</h2>
          <form onSubmit={handleSubmit}>
            <div className=" md:flex-row flex-col flex gap-6">
            <div className="md:w-10/12 w-full">
              <Label label="Name"/>
              <Input type="text" name="name"  value={name}  onChange={(e) => setName(e.target.value)}  placeholder={t("NamePlace")} />
              <Label label="Email"/>
              <Input 
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 placeholder={t("EmailPlace")}
                />
            </div>
            <div className="flex rounded-md mb-4 relative  p-3 border  flex-col justify-evenly items-center">              <label htmlFor="imageUpload" className="cursor-pointer lg:text-base text-sm">
                <div className="w-40 h-40 overflow-hidden rounded-md border-2 border-gray-300">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center text-sm justify-center w-full h-full bg-gray-100 text-gray-500">
                      {t("Upload Photo")}
                    </div>
                  )}
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
                      <p className="text-xs text-center text-gray-500 mt-2">
                        {t("imageSize")}
                      </p>
            </div>
            </div>
            <Button 
              Bg="bg-btn" 
              textColor="text-white" 
              text={mutation.isPending ? "Saving..." : "Save changes"} 
              disabled={mutation.isPending}
            />
          </form>
        </div>
        <div className="border"></div>
        <div className="lg:w-1/2 w-full">
          <Changepassword />
        </div>
      </div>
    </>
  );
}
