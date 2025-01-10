import { useEffect, useState } from "react";
import { nav } from "../../data/navData";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import xmark from "../../assets/nav/icon/x-mark.png";
import logo from "../../assets/logo/logo.svg";
import AuthSide from "./AuthSide";
import menu from "../../assets/nav/icon/toggle.svg";

export default function NavBar() {

  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* لتغيير لون الناف بار عند السكرول  */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 desktop:pt-5 pt-4 pb-5 desktop:pb-6 flex items-center  justify-between desktop:px-nav lg:px-60 transition-all duration-300 ${
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
          {nav.map((e, i) => (
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
      <AuthSide/>
      {/* toggle menu  */}
      <div className=" lg:hidden flex items-center">
          <button className="flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={menu} alt="menu" className="md:w-10 md:h-auto w-7 h-7" />
          </button>
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
          {nav.map((e, i) => (
                <NavLink key={i}
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={xmark} alt="menu" className="" />
          </button>
        </div>
      </div>
    </nav>
  );
}
