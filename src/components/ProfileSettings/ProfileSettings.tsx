import { useState } from "react";
import Button from "../../Ui/Button/Button";
import Changepassword from "../Changepassword/Changepassword";


export default function ProfileSettings() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  }; 
  return (
    <>
      <div className=" my-10">
        <h2 className="text-2xl font-semibold mb-6">Account settings</h2>
        <form className=" flex justify-between gap-10">
          <div className="flex relative   p-3 border border-violet-400 flex-col justify-evenly items-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="w-40 h-40  overflow-hidden border-2 border-gray-300">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
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
              <p className="text-xs w-3/4 text-center  text-gray-500 mt-2">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
          </div>
          <div className=" w-10/12   ">
          <label htmlFor="" className=" mb-1.5">Full name</label>
          <div className="flex justify-between gap-5 mb-5">
            <input type="text" className=" w-full border p-2 border-violet-400 bg-transparent placeholder:text-sm" placeholder="Enter your name"/>
          </div>
          <label htmlFor="" className="">Email</label>
          <div className="flex justify-between gap-5  mb-8">
            <input type="text" className="w-full border p-2 border-violet-400 bg-transparent  placeholder:text-sm" placeholder="Enter your email"/>
          </div>
          <Button Bg="bg-btn" textColor="text-white" text="Save changes" />
          </div>
        </form>
      </div>
      <div className=" py-10 border-t border-violet-900">
          <Changepassword/>
      </div>
    </>

  )
}
