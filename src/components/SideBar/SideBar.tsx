import { NavLink } from "react-router-dom";
import { SidebarProps } from "../../types/interfaces";
import xmark from "../../assets/nav/icon/x-mark.png";
import { nav } from "../../data/navData";
import { useTranslation } from "react-i18next";
import { getSecureCookie } from "../../utils/cookiesHelper";


export default function SideBar({ isOpen, onClose }: SidebarProps) {
  const {t} = useTranslation()
  const userRole = getSecureCookie('role'); 
  return (
    <div
    className={`fixed  flex justify-evenly items-center flex-col top-0 right-0 h-screen w-full max-w-sm bg-White/95 z-50 transform transition-transform duration-300 ${
      isOpen ? "translate-x-0 shadow-lg" : "translate-x-full"
    }`}
    >
    <div className="flex flex-col ">
      <div className="flex-grow flex flex-col items-center justify-center gap-5">
      {nav.filter((e) => {
            if (!userRole || userRole === "student") {
              return e.path !== "/instruct" && e.path !== "/Admin";
            }
            if (userRole === "admin") {
              return e.path !== "/instruct";
            }
            if (userRole === "instructor") {
              return e.path !== "/Admin";
            }
            return true;
          }).map((e, i) => (
            <NavLink key={i}  onClick={(onClose)}
              className={({ isActive }) =>
                isActive
                  ? "py-3.5 px-6 rounded-lg font-normal bg-indigo-400/10 h-full transition-all text-base desktop:text-lg duration-300"
                  : "py-3.5 px-6 rounded-lg font-normal h-full text-base desktop:text-lg"
              }
              to={e.path}
            >
              {t(e.text)}
            </NavLink>))}
      </div>
    </div>
    <div className="lg:hidden block">
      <button onClick={(onClose)}>
        <img src={xmark} alt="menu" className="" />
      </button>
    </div>
  </div>
  )
}
