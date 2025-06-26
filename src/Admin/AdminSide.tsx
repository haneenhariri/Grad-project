import { NavLink } from "react-router-dom";
import dash from "../assets-webp/ChartBar.webp";
import user from "../assets-webp/Users (1).webp";
import my from "../assets-webp/Stack.webp";
import ern from "../assets-webp/CreditCard (1).webp";
import stng from "../assets-webp/Gear.webp";
import Logo from "../Ui/Logo/Logo";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

export default function AdminSide() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const isArabic = i18n.language === "ar";
  const directionClass = isArabic ? "right-0" : "left-0";
  const transformClass = isOpen
    ? "translate-x-0"
    : isArabic
    ? "translate-x-full"
    : "-translate-x-full";

  const navLinks = [
    { to: "/Admin/dash", icon: dash, label: t("navigation.DashBoard") },
    { to: "/Admin/Courses", icon: my, label: t("navigation.Courses") },
    { to: "/Admin/Payments", icon: ern, label: t("navigation.Payments") },
    { to: "/Admin/instructorlist", icon: user, label: t("navigation.Instructors") },
    { to: "/Admin/Students", icon: user, label: t("navigation.Students") },
    { to: "/Admin/settings", icon: stng, label: t("navigation.Settings") },
    { to: "/Admin/log", icon: stng, label: t("navigation.Active Log") },
  ];

  return (
    <>
      {/* زر فتح القائمة على الموبايل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden p-3 text-white bg-gray-900 fixed top-1 z-50 rounded-full shadow-lg ${
          isArabic ? "right-[-24px]" : "left-[-24px]"
        }`}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 z-50 shadow-lg min-h-screen bg-gray-900 transform ${transformClass} ${directionClass} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-2/12 w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b gap-2.5">
          <Logo textColor="text-white" />
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-3 text-white bg-gray-900 rounded-full shadow-lg"
          >
            <BsX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-2.5 py-4 text-sm">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-400"
                } w-full px-4 py-2.5 flex items-center gap-2.5`
              }
            >
              <img src={link.icon} alt="" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
