import { useState } from "react";
import Button from "../Ui/Button/Button";
import Changepassword from "../components/Changepassword/Changepassword";
import { useMutation } from "@tanstack/react-query";
import { EditProfileInst } from "../services/profileStd";
import { useTranslation } from "react-i18next";
import Label from "../Ui/Label/Label";
import Input from "../Ui/Input/Input";
import { useAppDispatch } from "../hooks/hooks";
import { fetchProfile } from "../redux/profileSlice/profileSlice";
import { showToast } from "../utils/toast";
export default function InstractSettings() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [summery, setSummery] = useState<string>("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: EditProfileInst,
    onSuccess: (data) => {
      showToast(t("Profile updated successfully"), "success");
      setName("");
      setEmail("");
      setImage(undefined);
      setSpecialization("");
      setPreview(null);
      setEducation("");
      setSummery("");
      console.log("Profile updated successfully", data);
      dispatch(fetchProfile());
    },
    onError: (error) => {
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("education", education);
    formData.append("specialization", specialization);
    formData.append("summery", summery);
    if (image) {
      formData.append("profile_picture", image);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="  bg-white rounded-md gap-5 shadow-sm p-5 ">
      <div className=" w-full">
        <h2 className="text-2xl font-semibold mb-6">
          {t("navigation.Settings")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="  ">
            <div className="flex gap-6 flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-10/12">
                <Label label="Name" />
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("NamePlace")}
                />
                <Label label="Email" />
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("EmailPlace")}
                />
                <Label label="form.education" />
                <Input
                  type="text"
                  value={education}
                  placeholder={t("form.education")}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
              <div className="flex rounded-md mb-4 relative  p-3 border  flex-col justify-evenly items-center">
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
            <Label label="form.specialization" />
            <Input
              type="text"
              placeholder={t("form.specialization")}
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
            <Label label="form.summary" />
            <textarea
              className="w-full h-28 border p-2 rounded-md border-violet-400 bg-transparent placeholder:text-sm"
              placeholder={t("form.summary")}
              value={summery}
              onChange={(e) => setSummery(e.target.value)}
            />
          </div>
          <Button Bg="bg-btn" textColor="text-white my-4" text="Save changes" />
        </form>
      </div>
      <div className="border mb-4"></div>
      <div className="lg:w-1/2 w-full">
        <Changepassword />
      </div>
    </div>
  );
}
