import { NavLink } from "react-router-dom";
import { tabsProps } from "../../types/interfaces";
import { useTranslation } from "react-i18next";

export default function Tabs({path , text} : tabsProps) {
  const {t} = useTranslation();
  return (
    <NavLink
    to={path}
    className={({ isActive }) =>` text-base h-full py-2.5 ${isActive ? " border-b-2 border-[#f2b3fa94]" : ""}`}>
    {t(text)}
    </NavLink>
  )
}
