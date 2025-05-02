import { NavLink} from "react-router-dom"
import face from "../../assets/social/face.png";
import inst from "../../assets/social/Instragarm.png";
import linked from "../../assets/social/Linkedin.png";
import twitter from "../../assets/social/Twitter (1).svg";
import youtub from "../../assets/social/Frame 74.svg";
import Logo from "../../Ui/Logo/Logo";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const {t} = useTranslation();
  return (
    <footer className="bg-gray-900  text-white">
      <div  className="px-4 lg:px-10 desktop:px-40 py-20 flex gap-y-10 lg:flex-row flex-col justify-between border-b border-gray-700">
        <div className="lg:w-5/12 flex-wrap w-full">
        <div className="flex items-center mb-7.5 gap-1">
          <Logo textColor="text-white"/>
        </div>
         <p className="text-sm text-gray-500 mb-7.5">{t("footerP")}</p>
         <div className=" flex gap-2.5">
          <div className="p-2.5 bg-slate-800 w-max"><img src={face} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={inst} alt="" /></div>
          <div className="p-2.5 bg-btn w-max"><img src={linked} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={twitter} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={youtub} alt="" /></div>

         </div>
        </div>
        <div className="lg:w-1/2 w-full flex-wrap flex lg:justify-evenly justify-between  gap-3.5">
        <div>
            <h3 className=" text-base font-normal mb-5">{t("Top 4 Category")}</h3>
            <p className="text-sm font-normal text-gray-500 mb-2" >{t("topCategory.Development")}</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >{t("topCategory.Design")}</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >{t("topCategory.AI & ML")}</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >{t("topCategory.Cybersecurity")}</p>
        </div>
        <div>
            <h3 className=" text-base font-normal mb-5">{t("Quick Links")}</h3>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("navigation.Home")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("navigation.About")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("navigation.Contact")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("navigation.Become an Instructor")}</NavLink>
        </div>
        <div>
            <h3 className=" text-base font-normal mb-5">{t("Support")}</h3>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("Help Center")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("FAQs")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("Terms & Condition")}</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>{t("Privacy Policy")}</NavLink>
        </div>
        </div>
      </div>
    </footer>
  )
}
