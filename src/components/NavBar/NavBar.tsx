import { useEffect, useState } from "react";
import { navAuth } from "../../data/navData";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthSide from "./AuthSide";
import menu from "../../assets/nav/icon/toggle.svg";
import SideBar from "../SideBar/SideBar";
import Logo from "../../Ui/Logo/Logo";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TopNav from "../../Ui/TopNav/TopNav";

export default function NavBar() {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeButton, setActiveButton] = useState(2);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]); 

  return (
    <nav className="sticky top-0 z-50">
      <TopNav/>
      <nav
      className={` desktop:pt-5 py-4  desktop:pb-6 flex items-center justify-between desktop:px-nav lg:px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-White/95 tablet:mx-0 mx-0 shadow-lg  desktop:mx-0"
          : "  "
      }`}
    >
      <div className="flex justify-between gap-50 items-center">
        {/* logo */}
        <Logo />
      </div>
      <div className=" flex items-center gap-2">
      {isAuthenticated ? (
        <AuthSide /> 
      ) : (
        <div className="flex  gap-5 items-center">
          {navAuth.map((e, i) => (
            <NavLink
              key={i}
              to={e.path}
              onClick={() => setActiveButton(e.state)}
              className={`${
                activeButton === e.state
                  ? "bg-violet-950 text-white desktop:py-3.5 desktop:px-8.5 tablet:py-3 tablet:px-5 p-2"
                  : ""
              } desktop:text-lg tablet:text-sm text-xs font-normal transition-all duration-300 rounded-lg`}
            >
              {t(e.text)}
            </NavLink>
          ))}
        </div>
      )}
      {/* toggle menu */}
      <div className="lg:hidden flex items-center">
        <button className="flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={menu} alt="menu" className="md:w-10 md:h-auto w-7 h-7" />
        </button>
      </div>
      </div>

      {/* black layer side bar */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      {/* side bar */}
      <SideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
    </nav>

  );
}
