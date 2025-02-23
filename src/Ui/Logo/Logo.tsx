import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { useTranslation } from "react-i18next";
interface logoProps
{
    textColor?: string
}
export default function Logo({textColor} :logoProps ) {
  const {t} = useTranslation()
  return (
        <NavLink to={'/'} className="flex items-center gap-1">
          <img src={logo} alt="logo" className="md:w-10 md:h-10 w-7.5 h-7.5" />
          <h1 className={`font-extrabold md:text-[30px] text-2xl ${textColor}`}>{t("Logo.logo")}</h1>
        </NavLink>
  )
}
