import { useState } from "react";
import Button from "../../Ui/Button/Button";
import Changepassword from "../Changepassword/Changepassword";
import { useMutation } from "@tanstack/react-query";
import { EditProfile } from "../../services/profileStd";

export default function ProfileSettings() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation({
    mutationFn: EditProfile,
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
    },
    onError: (error: any) => {
      console.error("Error updating profile", error);
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
    mutation.mutate({
      _method : "PUT",
      name: name,
      email: email,
      profile_picture: image, 
    });
  };

  return (
    <>
      <div className="py-10 flex border gap-5 rounded-md p-5 border-violet-400">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Account settings</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5">Full name</label>
              <div className="flex justify-between gap-5 mb-5">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                  placeholder="Enter your name"
                  value={name}   
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label>Email</label>
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
            <div className="flex rounded-md mb-6 relative w-1/2 p-3 border border-violet-400 flex-col justify-evenly items-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
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
            <Button Bg="bg-btn" textColor="text-white" text="Save changes" />
          </form>
        </div>
        <div className="border"></div>
        <div className="w-1/2">
          <Changepassword />
        </div>
      </div>
    </>
  );
}
