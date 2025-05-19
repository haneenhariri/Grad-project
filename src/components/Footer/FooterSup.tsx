import { useNavigate } from 'react-router-dom';
import Button from "../../Ui/Button/Button"
import { useTranslation } from 'react-i18next';
import "./FooterSup.css";

export default function FooterSup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleJoin = () => {
    navigate("/auth/login");
  }
  
  const handleViewAllCourses = () => {
    navigate("/courses");
  }
  
  return (
    <div className="footer-sup-container">
      <div className="footer-sup-content px-4 lg:px-10 desktop:px-40 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-5/12 rtl:lg:w-1/3 w-full text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-8">
            {t("subFooter")}
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <Button 
              text="Join the Family" 
              Bg="bg-btn hover:bg-btn/90" 
              textColor="text-white"
              className="shadow-lg transition-transform hover:scale-105" 
              onClick={handleJoin} 
            />
            <Button 
              text="Browse all courses" 
              Bg="bg-white hover:bg-gray-100" 
              textColor="text-gray-900"
              className="shadow-lg transition-transform hover:scale-105" 
              onClick={handleViewAllCourses} 
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-wrap justify-center lg:justify-evenly gap-8 lg:gap-3.5 mt-6 lg:mt-0">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2.5 text-white">6.3k</h2>
            <p className="text-base text-gray-200">{t("Courses")}</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2.5 text-white">6.3k</h2>
            <p className="text-base text-gray-200">{t("Certified Instructor")}</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2.5 text-white">6.3k</h2>
            <p className="text-base text-gray-200">{t("Total Rate")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
