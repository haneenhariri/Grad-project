import { NavLink, useNavigate } from "react-router-dom"
import face from "../../assets/social/face.png";
import inst from "../../assets/social/Instragarm.png";
import linked from "../../assets/social/Linkedin.png";
import twitter from "../../assets/social/Twitter (1).svg";
import youtub from "../../assets/social/Frame 74.svg";
import Logo from "../../Ui/Logo/Logo";
import { useTranslation } from "react-i18next";
import Button from "../../Ui/Button/Button";
import "./Footer.css";

export default function Footer() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  
  const handleJoin = () => {
    navigate("/auth/login");
  }
  
  const handleViewAllCourses = () => {
    navigate("/courses");
  }

  return (
    <footer className="footer-container pt-40">
      {/* قسم الإحصائيات والدعوة للانضمام */}
      <div className="stats-section px-4 lg:px-10 desktop:px-40 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-5/12 rtl:lg:w-1/3 w-full text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-8">
            {t("subFooter")}
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5">
            <Button 
              text="Join the Family" 
              Bg="bg-btn shadow-lg transition-transform hover:scale-105 hover:bg-btn/90" 
              textColor="text-white"
              onClick={handleJoin} 
            />
            <Button 
              text="Browse all courses" 
              Bg="bg-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-100" 
              textColor="text-gray-900"
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

      {/* قسم معلومات الفوتر */}
      <div className="footer-content px-4 lg:px-10 desktop:px-40 py-16 flex gap-y-10 lg:flex-row flex-col justify-between">
        <div className="lg:w-5/12 flex-wrap w-full">
          <div className="flex items-center mb-7.5 gap-1">
            <Logo textColor="text-white"/>
          </div>
          <p className="text-sm text-gray-300 mb-7.5">{t("footerP")}</p>
          <div className="flex gap-2.5">
            <div className="p-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-md w-max">
              <img src={face} alt="" />
            </div>
            <div className="p-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-md w-max">
              <img src={inst} alt="" />
            </div>
            <div className="p-2.5 bg-btn hover:bg-btn/90 transition-all rounded-md w-max">
              <img src={linked} alt="" />
            </div>
            <div className="p-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-md w-max">
              <img src={twitter} alt="" />
            </div>
            <div className="p-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-md w-max">
              <img src={youtub} alt="" />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex-wrap flex lg:justify-evenly justify-between gap-3.5">
          <div>
            <h3 className="text-base font-medium mb-5 text-white">{t("Top 4 Category")}</h3>
            <p className="text-sm font-normal text-gray-300 mb-2 hover:text-white transition-colors" >{t("topCategory.Development")}</p>
            <p className="text-sm font-normal text-gray-300 mb-2 hover:text-white transition-colors" >{t("topCategory.Design")}</p>
            <p className="text-sm font-normal text-gray-300 mb-2 hover:text-white transition-colors" >{t("topCategory.AI & ML")}</p>
            <p className="text-sm font-normal text-gray-300 mb-2 hover:text-white transition-colors" >{t("topCategory.Cybersecurity")}</p>
          </div>
          <div>
            <h3 className="text-base font-medium mb-5 text-white">{t("Quick Links")}</h3>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("navigation.Home")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("navigation.About")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("navigation.Contact")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("navigation.Become an Instructor")}</NavLink>
          </div>
          <div>
            <h3 className="text-base font-medium mb-5 text-white">{t("Support")}</h3>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("Help Center")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("FAQs")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-300 mb-2 hover:text-white transition-colors" to={"/about"}>{t("Terms & Condition")}</NavLink>
          </div>
        </div>
      </div>
      <div className="footer-copyright py-6 px-4 lg:px-10 desktop:px-40 text-center text-gray-300 text-sm">
        <p>© {new Date().getFullYear()} {t("Logo.logo")}. {t("All rights reserved")}</p>
      </div>
    </footer>
  )
}
