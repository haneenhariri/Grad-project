import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../Ui/Button/Button";
import "./Instructor.css";
import instructorImage from "../../assets/Union.png"; // تأكد من وجود هذه الصورة أو استبدلها بالمسار الصحيح

export default function Instuctor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleViewAllCourses = () => {
    navigate("/Instructor");
  }
  
  return (
    <section className="instructor-section my-16 md:my-24 rounded-xl overflow-hidden">
      <div className="instructor-container py-8 md:py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-left md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("CoursesSection.Become")}
          </h2>
          
          <p className="mb-8 text-base md:text-lg text-white/90 max-w-xl">
            {t("Instructors")}
          </p>
          
          <Button 
            text="Start teaching" 
            Bg="bg-white hover:bg-gray-100" 
            textColor="px-8 py-3 text-lg shadow-lg transition-transform hover:scale-105 text-violet-950 font-semibold" 
            onClick={handleViewAllCourses}
          />
        </div>
          <div className="instructor-image-container flex justify-end items-end">
            <img 
              src={instructorImage} 
              alt="Become an instructor" 
              className="instructor-image w-2/3"
            />
          </div>
      </div>
    </section>
  )
}
