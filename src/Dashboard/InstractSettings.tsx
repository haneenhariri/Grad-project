import { useState } from "react";
import Button from "../Ui/Button/Button";
import Changepassword from "../components/Changepassword/Changepassword";
import { useMutation } from "@tanstack/react-query";
import { EditProfileInst } from "../services/profileStd";
export default function InstractSettings() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [summery, setSummery] = useState<string>("");

  const mutation = useMutation({
    mutationFn: EditProfileInst,
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
      education: education,
      specialization: specialization,
      summery:summery,
    });
  };

  return (
    <section className="  p-5 bg-white rounded-md   my-10  ">
     <>
       <div className="py-10 flex lg:flex-row flex-col border gap-5 rounded-md p-5 border-violet-400">
         <div className="lg:w-1/2 w-full">
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
               <label>Education</label>
               <div className="flex justify-between gap-5 mb-8">
                 <input
                   type="text"
                   className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                   placeholder="Enter your education"
                   value={education}
                   onChange={(e) => setEducation(e.target.value)}
                 />
               </div>
               <label>Specialization</label>
               <div className="flex justify-between gap-5 mb-8">
                 <input
                   type="text"
                   className="w-full border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                   placeholder="Enter your specialization"
                   value={specialization}
                   onChange={(e) => setSpecialization(e.target.value)}
                 />
               </div>
               <label>Summery</label>
               <div className="flex justify-between gap-5 mb-8">
                 <textarea
                   className="w-full h-28 border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
                   placeholder="Enter your summery"
                   value={summery}
                   onChange={(e) => setSummery(e.target.value)}
                 />
               </div>
             </div>
             <div className="flex rounded-md mb-6 relative md:w-1/2 p-3 border border-violet-400 flex-col justify-evenly items-center">
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
         <div className="lg:w-1/2 w-full">
           <Changepassword />
         </div>
       </div>
     </>
    </section>

  )
}
