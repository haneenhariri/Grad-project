import { NavLink } from "react-router-dom";
import { NavProps } from "../../types/interfaces";
import { useTranslation } from "react-i18next";

export default function NavLinkDash({pathLink , title , icon} : NavProps) {
  const {t} = useTranslation()
  return (
    <NavLink className={({ isActive }) => isActive ? ' bg-violet-600 items-center text-white w-full p-2.5 flex gap-2.5 ' : 'text-gray-400 w-full p-2.5 flex items-center gap-2.5'} to={pathLink}>
      <img src={icon} alt={title}  className=" w-6 h-6"/>
      {t(`navigation.${title}`)}
    </NavLink>
  )
}
