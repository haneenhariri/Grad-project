import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoProps } from "../../types/interfaces";

export default function Logo({textColor} :logoProps) {
  const {t} = useTranslation();
  
  return (
    <NavLink to={'/'} className="flex items-center gap-3">
      <div className="logo-container relative">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-12 md:h-12 w-10 h-10 transition-all duration-300 hover:scale-110">
          {/* خلفية اللوغو */}
          <rect width="44" height="44" rx="10" fill="#9C4DF4"/>
          
          {/* قوس البرمجة الأيسر < */}
          <path d="M12 16L8 22L12 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          
          {/* قوس البرمجة الأيمن > */}
          <path d="M32 16L36 22L32 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          
          {/* حرف ع كنص بخط تجوال - تم ضبط الموضع بدقة */}
          <text x="22" y="18" fontFamily="Tajawal, Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" alignmentBaseline="central" dominantBaseline="middle">ع</text>
        </svg>
      </div>
      <h1 className={`font-extrabold md:text-[30px] sm:text-2xl sm:block hidden ${textColor} font-tajawal`}>{t("Logo.logo")}</h1>
    </NavLink>
  )
}
