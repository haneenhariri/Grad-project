import { NavLink } from "react-router-dom";
import { tabsProps } from "../../types/interfaces";

export default function Tabs({path , text} : tabsProps) {
  return (
    <NavLink
    to={path}
    className={({ isActive }) =>` text-base h-full py-2.5 ${isActive ? "text-violet-400 border-b-2 border-violet-400" : ""}`}>
    {text}
    </NavLink>
  )
}
