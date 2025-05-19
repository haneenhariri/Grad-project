import { useState } from "react";
import Button from "../../Ui/Button/Button";
import Changepassword from "../Changepassword/Changepassword";
import { useMutation } from "@tanstack/react-query";
import { EditProfile } from "../../services/profileStd";
import { AxiosError } from "axios";
import { showToast } from "../../utils/toast";

export default function ProfileSettings() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation({
    mutationFn: EditProfile,
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
      showToast('Profile updated successfully', 'success');
      setName("");
      setEmail("");
      setImage(undefined);
      setPreview(null);
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
    const profileData: any = {};
    
    if (name) profileData.name = name;
    if (email) profileData.email = email;
    if (image) profileData.profile_picture = image;
    
    // طباعة البيانات للتحقق
    console.log("Submitting profile data:", profileData);
    
    // التحقق من وجود بيانات للإرسال
    if (Object.keys(profileData).length === 0) {
      showToast('No changes to update', 'info');
      return;
    }
    
    // إرسال البيانات
    mutation.mutate(profileData);
  };

  return (
    <>
      <div className=" flex  flex-col  gap-5 rounded-md p-5 ">
        <div className="lg:w-1/2 w-full">
          <h2 className="md:text-2xl text-lg font-semibold mb-6">Account settings</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 lg:text-base text-sm">Full name</label>
              <div className="flex justify-between gap-5 mb-5">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                  placeholder="Enter your name"
                  value={name}   
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label className=" lg:text-base text-sm">Email</label>
              <div className="flex justify-between gap-5 mb-8">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex rounded-md mb-6 relative md:w-1/2 w-full p-3 border border-violet-400 flex-col justify-evenly items-center">
              <label htmlFor="imageUpload" className="cursor-pointer lg:text-base text-sm">
                <div className="w-40 h-40 overflow-hidden rounded-md border-2 border-gray-300">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center text-sm justify-center w-full h-full bg-gray-100 text-gray-500">
                      Upload Photo
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
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
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
