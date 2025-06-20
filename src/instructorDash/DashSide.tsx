import { useState } from "react";
import { instractSide } from "../data/sideDashData";
import Logo from "../Ui/Logo/Logo";
import NavLinkDash from "../Ui/NavLinkDash/NavLinkDash";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
import { BsX } from "react-icons/bs";

export default function DashSide() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isArabic = i18n.language === "ar";

  return (
    <>
      {/* زر فتح القائمة على الموبايل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden p-3 text-white bg-gray-900 fixed top-1 z-50 rounded-full shadow-lg ${
          isArabic ? "right-[-30px]" : "left-[-30px]"
        }`}
      >
        <FiMenu size={24} />
      </button>

      <div
        className={`fixed top-0 z-50 shadow-lg min-h-screen bg-gray-900 transform transition-transform duration-300 ease-in-out 
    ${isArabic ? "right-0" : "left-0"}
    ${
      isOpen
        ? "translate-x-0"
        : isArabic
        ? "translate-x-full"
        : "-translate-x-full"
    }
    lg:translate-x-0 lg:static lg:w-2/12 w-64`}
      >
        <div className="flex text-white items-center justify-between p-2.5 border-b gap-2.5">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-3 text-white bg-gray-900 rounded-full shadow-lg"
          >
            <BsX size={24} />
          </button>
        </div>
        <div className=" flex flex-col items-center gap-2.5 py-4 text-sm">
          {instractSide.map((e, i) => (
            <NavLinkDash
              key={i}
              pathLink={e.pathLink}
              title={e.title}
              icon={e.img}
              onClick={() => setIsOpen(false)} // ✨ مهم جدًا لإغلاق السايدبار بعد النقر
            />
          ))}
        </div>
      </div>
    </>
  );
}
