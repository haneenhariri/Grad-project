import { NavLink } from "react-router-dom";
import { nav } from "../../data/navData";
import { getSecureCookie } from "../../utils/cookiesHelper";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function TopNav() {
    const userRole = getSecureCookie('role'); 
    const { t } = useTranslation();
  return (
    <nav className=" flex items-center h-11 lg:px-8 justify-between bg-gray-900">
        <ul className="lg:flex hidden gap-2.5 items-center  text-sm">
        {nav
          .filter((e) => {
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
          })
          .map((e, i) => (
            <li key={i}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-2.5 text-white font-normal border-t-2 border-btn  h-full transition-all text-base desktop:text-lg duration-300"
                    : "p-2.5 font-normal text-gray-400 h-full text-base desktop:text-lg"
                }
                to={e.path}
              >
                {t(e.text)}
              </NavLink>
            </li>
          ))}
      </ul>
      <LanguageSelector/>
    </nav>
  )
}
