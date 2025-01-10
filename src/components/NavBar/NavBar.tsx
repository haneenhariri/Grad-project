import { useEffect, useState } from "react";
import { nav } from "../../data/navData";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import menu from "../../assets/nav/icon/toggle.svg";
import xmark from "../../assets/nav/icon/x-mark.png";
import logo from "../../assets/logo/logo.svg";
import Logout from "../Logout/Logout";
/*  تحديد جهة النص حسب اللغة  */
const updateHtmlAttributes = (language: string) => {
  const html = document.documentElement;
  html.lang = language;
  html.dir = language === "ar" ? "rtl" : "ltr";
};

export default function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUserName, setStoredUserName] = useState<string>("");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    updateHtmlAttributes(storedLanguage);
    i18n.changeLanguage(storedLanguage);
    /*  تخزين اللغة المختارة  */
    const token = localStorage.getItem("token");
    /* اذا كان المستخدم مسجل دخول ويوجد توكن نحفظ الاسم الخاص به  */
    if (token) {
      setIsLoggedIn(true);
      const storedName = localStorage.getItem("name") || "User";
      setStoredUserName(storedName);
    }
  }, [i18n]);
  /* لتغيير لون الناف بار عند السكرول  */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

/*   const toggleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    updateHtmlAttributes(newLanguage);
  }; */

  return (
    <nav
      className={`sticky top-0 z-50 desktop:pt-5 pt-4 pb-5 desktop:pb-6 flex items-center justify-between desktop:px-nav lg:px-60 transition-all duration-300 ${
        isScrolled
          ? "bg-White/95 tablet:mx-0 mx-0 shadow-lg px-4 desktop:mx-0"
          : "desktop:mx-7.5 tablet:mx-5 mx-4"
      }`}
    >
      {/* الناف الاساسي في القياسات الكبيرة  */}
      <div className="flex justify-between gap-50 items-center">
        {/* logo */}
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="md:w-10 md:h-10 w-7.5 h-7.5" />
          <h1 className="font-semibold md:text-[30px] text-2xl">Orbah</h1>
        </div>
        <ul className="lg:flex hidden">
          {nav.slice(0, 3).map((e, i) => (
              <li key={i}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-3.5 px-6 rounded-lg font-normal bg-indigo-400/10 h-full transition-all text-base desktop:text-lg duration-300"
                      : "py-3.5 px-6 rounded-lg font-normal h-full text-base desktop:text-lg"
                  }
                  to={e.path}
                >
                  {t(e.text)}
                </NavLink>
              </li>
            
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-5">
        {/* لتغغير اللغة  */}
{/*         <select
          onChange={toggleLanguage}
          value={i18n.language}
          className="px-4 py-2  bg-transparent rounded-md text-base"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select> */}
        
        {/* هنا اذا كان غير مسجل يعرض ازرار تسجيل الدخول بينما اذا كان مسجل يعرض البروفايل  */}
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/User/settings")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-950 text-white text-lg"
            >
            {storedUserName.charAt(0)}
            </button>
            <Logout/>
          </>
           ) : (
          /* ازرار تسجيل الدخول في القياسات الوسط و الاصغر تختفي لتظهر في السايد بار  */
          <div className=" lg:flex hidden gap-5 items-center">
            {nav.slice(3, 5).map((e, i) => (
              <NavLink
                key={i}
                to={e.path}
                onClick={() => setActiveButton(e.text.toLowerCase())}
                className={`${
                  activeButton === e.text.toLowerCase()
                    ? "bg-violet-950 text-white desktop:py-3.5 desktop:px-8.5 tablet:py-3 tablet:px-5 p-2"
                    : ""
                } desktop:text-lg tablet:text-sm text-xs font-normal transition-all duration-300 rounded-lg`}
              >
                {t(e.text)}
              </NavLink>
            ))}
          </div>
        )}
        {/* toggle menu  */}
        <div className="lg:hidden block">
          <button className="flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={menu} alt="menu" className="md:w-10 md:h-auto w-7 h-7" />
          </button>
        </div>
      </div>
      {/* black lear side bar  */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      {/* side bar */}
      <div
        className={`fixed  flex justify-evenly items-center flex-col top-0 right-0 h-screen w-full max-w-sm bg-White/95 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0 shadow-lg" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col ">
          <div className="flex-grow flex flex-col items-center justify-center gap-5">
          {nav.slice(0, 2).map((e, i) => (
            (e.path !== "/courses" || isLoggedIn) && (
                <NavLink key={i}
                  className={({ isActive }) =>
                    isActive
                      ? "py-3.5 px-6 rounded-lg font-normal bg-indigo-400/10 h-full transition-all text-base desktop:text-lg duration-300"
                      : "py-3.5 px-6 rounded-lg font-normal h-full text-base desktop:text-lg"
                  }
                  to={e.path}
                >
                  {t(e.text)}
                </NavLink>
            )
          ))}
          </div>
        </div>
        <div className=" flex  flex-col-reverse  gap-5 items-center">
            {nav.slice(2, 4).map((e, i) => (
              <NavLink
                key={i}
                to={e.path}
                onClick={() => setActiveButton(e.text.toLowerCase())}
                className={`${
                  activeButton === e.text.toLowerCase()
                    ? "bg-violet-950 text-white desktop:py-3.5 desktop:px-8.5 tablet:py-3 tablet:px-5 p-2"
                    : ""
                } desktop:text-lg tablet:text-sm text-xs font-normal transition-all duration-300 rounded-lg`}
              >
                {t(e.text)}
              </NavLink>
            ))}
        </div>
        <div className="lg:hidden block">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={xmark} alt="menu" className="" />
          </button>
        </div>
      </div>
    </nav>
  );
}
