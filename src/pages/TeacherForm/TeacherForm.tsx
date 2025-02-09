import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitTeacherForm } from "../../services/teacherForm";

export default function TeacherForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    specialization: "",
    summery: "",
    cv: null as File | null,
  });

  const mutation = useMutation({
    mutationFn: submitTeacherForm,
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      alert("حدث خطأ أثناء إرسال البيانات!");
    },
  });

  const handleNext = () => setStep((prev) => (prev < 2 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.education.trim() &&
      formData.specialization.trim() &&
      formData.cv !== null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("يرجى تعبئة جميع الحقول قبل الإرسال!");
      return;
    }
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <section className="px-4 h-screen flex justify-center items-center lg:px-20 ">
      <div className="text-center text-xl font-bold text-green-600 ">
        Your request has been successfully submitted and will be reviewed soon.
      </div>
      </section>
    ); 
  }

  return (
    <section className="px-4 lg:px-20 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 w-10/12 mx-auto lg:p-12 rounded-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <span className={`${step >= 1 ? "text-violet-600 font-bold" : "text-gray-400"}`}>
            1. Personal Info
          </span>
          <span className={`${step === 2 ? "text-violet-600 font-bold" : "text-gray-400"}`}>
            2. Documents
          </span>
        </div>

        <div className="relative w-full h-2 bg-gray-200 rounded-lg mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-violet-600 rounded-lg transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        {step === 1 && (
          <div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-h border rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-h border rounded-lg"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Summary</label>
              <input
                name="summery"
                value={formData.summery}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mb-5 w-1/2">
              <label className="block font-medium mb-2">Upload Cv</label>
              <div
                className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
                onClick={() => document.getElementById("cv")?.click()}
              >
                Upload Your Cv
              </div>
              <input
                type="file"
                name="cv"
                id="cv"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={handlePrev} className="px-6 py-2 bg-gray-300 rounded-lg">
              Previous
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={handleNext} className="px-6 py-2 bg-violet-600 text-white rounded-lg">
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-6 py-2 rounded-lg ${
                isFormValid() ? "bg-green-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
