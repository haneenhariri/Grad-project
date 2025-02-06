import { useState } from "react";

export default function TeacherForm() {
  const [step, setStep] = useState(1); // Current step in the form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    idDocument: null,
    certificates: [],
    experienceLetters: [],
    expertise: "",
    yearsOfExperience: "",
    summary: "",
  });

  // Handlers for form data updates
  const handleNext = () => setStep((prev) => (prev < 2 ? prev + 1 : prev));
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "certificates" || name === "experienceLetters" ? Array.from(files) : files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your form submission logic here
  };

  return (
    <section className="px-4 lg:px-20 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 w-10/12 mx-auto lg:p-12 rounded-xl"
      >
        {/* Progress Bar */}
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

        {/* Form Steps */}
        {step === 1 && (
          <div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <label className="block font-medium  mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
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
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
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
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Specialization</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mt-5">
              <label className="block font-medium mb-2">Summary</label>
              <textarea
              
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-h border rounded-lg"
              />
            </div>
            <div className="mb-5 w-1/2">
              <label className="block font-medium mb-2">Upload Cv</label>
              <div
                className="border-dashed border-2  border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
                onClick={() => document.getElementById("idDocument")?.click()}
              >
              Upload Your Cv
              </div>
              <input
                type="file"
                name="idDocument"
                id="idDocument"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-300 rounded-lg"
            >
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-violet-600 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
