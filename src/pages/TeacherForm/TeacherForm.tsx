import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitTeacherForm } from "../../services/teacherForm";
import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import Label from "../../Ui/Label/Label";

export default function TeacherForm() {
  const { t } = useTranslation();
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
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: submitTeacherForm,
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      setErrors({
        general: t("form.generalError")
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
      setFileName(files[0].name);
      
      // Clear CV error if it exists
      if (errors.cv) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.cv;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const formErrors: Record<string, string> = {};
    
    // Validate personal information
    if (!formData.name.trim()) formErrors.name = t("form.nameRequired");
    if (!formData.email.trim()) formErrors.email = t("form.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = t("form.emailInvalid");
    if (!formData.password.trim()) formErrors.password = t("form.passwordRequired");
    else if (formData.password.length < 6) formErrors.password = t("form.passwordLength");
    
    // Validate professional information
    if (!formData.education.trim()) formErrors.education = t("form.educationRequired");
    if (!formData.specialization.trim()) formErrors.specialization = t("form.specializationRequired");
    if (!formData.summery.trim()) formErrors.summery = t("form.summaryRequired");
    if (!formData.cv) formErrors.cv = t("form.cvRequired");
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <section className="px-4 min-h-screen flex justify-center items-center bg-bg-primary-color mt-[108px]">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4">{t("instructor.applicationSubmitted")}</h2>
          <p className="text-Grey/40 mb-6">
            {t("instructor.applicationSuccess")}
          </p>
          <Button 
            text={t("backToHome")} 
            Bg="bg-btn" 
            textColor="text-white" 
            onClick={() => window.location.href = '/'}
          />
        </div>
      </section>
    ); 
  }

  return (
    <section className="px-4 lg:px-20 py-16 bg-bg-primary-color min-h-screen mt-[108px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t("instructor.joinTeam")}</h1>
          <p className="text-Grey/40 max-w-2xl mx-auto">
            {t("instructor.shareKnowledge")}
          </p>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-6 md:p-10 rounded-xl"
        >
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-6 pb-2 border-b border-Grey/20">{t("instructor.personalInfo")}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label label={t("form.name")}/>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-bg-primary-color border ${
                    errors.name ? "border-red-500" : "border-Grey/70"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                  placeholder={t("form.name")}
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>
              
              <div>
                <Label label={t("form.email")}/>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-bg-primary-color border ${
                    errors.email ? "border-red-500" : "border-Grey/70"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                  placeholder={t("form.email")}
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <Label label={t("form.password")}/>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 bg-bg-primary-color border ${
                  errors.password ? "border-red-500" : "border-Grey/70"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                placeholder={t("form.password")}
              />
              {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-6 pb-2 border-b border-Grey/20">{t("instructor.professionalInfo")}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label label={t("form.education")}/>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`w-full p-3 bg-bg-primary-color border ${
                    errors.education ? "border-red-500" : "border-Grey/70"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                  placeholder={t("form.education")}
                />
                {errors.education && <p className="mt-1 text-red-500 text-sm">{errors.education}</p>}
              </div>
              
              <div>
                <Label label={t("form.specialization")}/>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`w-full p-3 bg-bg-primary-color border ${
                    errors.specialization ? "border-red-500" : "border-Grey/70"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                  placeholder={t("form.specialization")}
                />
                {errors.specialization && <p className="mt-1 text-red-500 text-sm">{errors.specialization}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <Label label={t("form.summary")}/>
              <textarea
                name="summery"
                value={formData.summery}
                onChange={handleChange}
                rows={4}
                className={`w-full p-3 bg-bg-primary-color border ${
                  errors.summery ? "border-red-500" : "border-Grey/70"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-btn/50`}
                placeholder={t("form.summary")}
              ></textarea>
              {errors.summery && <p className="mt-1 text-red-500 text-sm">{errors.summery}</p>}
            </div>
            
            <div>
              <Label label={t("form.cv")}/>
              <div 
                className={`border-2 border-dashed ${
                  errors.cv ? "border-red-500" : "border-Grey/70"
                } rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
                onClick={() => document.getElementById('cv-upload')?.click()}
              >
                <input
                  type="file"
                  id="cv-upload"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                {fileName ? (
                  <p className="text-btn font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-gray-700 mb-1">{t("form.dragDrop")}</p>
                    <p className="text-gray-500 text-sm">{t("form.fileTypes")}</p>
                  </>
                )}
              </div>
              {errors.cv && <p className="mt-1 text-red-500 text-sm">{errors.cv}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-Grey/40 text-sm">
                {t("form.termsAgreement")} <a href="#" className="text-btn hover:underline">{t("form.termsAndConditions")}</a> {t("form.and")} <a href="#" className="text-btn hover:underline">{t("form.privacyPolicy")}</a>. {t("form.infoConfirmation")}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              text={t("getStarted")} 
              Bg="bg-btn w-full md:w-1/2" 
              textColor="text-white"
            />
          </div>
          
          {errors.general && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
