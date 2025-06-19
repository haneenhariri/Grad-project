import { NavLink } from "react-router-dom";
import dash from "../assets/ChartBar.png";
import user from "../assets/Users (1).png";
import my from "../assets/Stack.png";
import ern from "../assets/CreditCard (1).png";
import stng from "../assets/Gear.png";
import Logo from "../Ui/Logo/Logo";
import { useTranslation } from "react-i18next";

export default function AdminSide() {
  const { t } = useTranslation();
  return (
    <div className=" w-2/12  min-h-screen bg-gray-900 ">
      <div className="flex items-center  p-2.5 border-b gap-2.5">
        <Logo textColor="text-white" />
      </div>
      <div className=" flex flex-col items-center gap-2.5 py-4 text-sm">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " bg-violet-600 text-white w-full p-2.5 flex gap-2.5 "
              : "text-gray-400 w-full p-2.5 flex gap-2.5"
          }
          to={"/Admin/dash"}
        >
          <img src={dash} alt="" />
          {t("navigation.DashBoard")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5"
              : "text-gray-400 w-full p-2.5 flex gap-2.5"
          }
          to={"/Admin/Courses"}
        >
          <img src={my} alt="" />
          {t("navigation.Courses")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5"
              : "text-gray-400 w-full p-2.5 flex gap-2.5"
          }
          to={"/Admin/Payments"}
        >
          <img src={ern} alt="" />
          {t("navigation.Payments")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5 items-center"
              : "text-gray-400 w-full p-2.5 flex items-center gap-2.5"
          }
          to={"/Admin/instructorlist"}
        >
          <img src={user} alt="" />
          {t("navigation.Instructors")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5 items-center"
              : "text-gray-400 w-full p-2.5 flex items-center gap-2.5"
          }
          to={"/Admin/Students"}
        >
          <img src={user} alt="" />
          {t("navigation.Students")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5"
              : "text-gray-400 w-full p-2.5 flex gap-2.5"
          }
          to={"/Admin/settings"}
        >
          <img src={stng} alt="" />
          {t("navigation.Settings")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-600 text-white w-full p-2.5 flex gap-2.5"
              : "text-gray-400 w-full p-2.5 flex gap-2.5"
          }
          to={"/Admin/log"}
        >
          <img src={stng} alt="" />
          {t("navigation.Active Log")}
        </NavLink>
      </div>
    </div>
  );
}
