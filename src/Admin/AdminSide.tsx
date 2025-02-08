import { NavLink } from "react-router-dom";
import dash from "../assets/ChartBar.png";
import user from "../assets/Users (1).png";
import my from "../assets/Stack.png";
import ern from "../assets/CreditCard (1).png";
import stng from "../assets/Gear.png";
import Logo from "../components/Logo/Logo";

export default function AdminSide() {
  return (
    <div className=" w-2/12 bg-gray-900 ">
        <div className="flex items-center  p-2.5 border-b gap-2.5">
          <Logo textColor="text-white"/>
        </div>
        <div className=" flex flex-col items-center gap-2.5 py-4 text-sm">
            <NavLink className={({ isActive }) => isActive ? ' bg-violet-600 text-white w-full p-2.5 flex gap-2.5 ' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/Admin/dash'} >
                <img src={dash} alt="" />
                Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/Admin/Create'} >
            <img src={my} alt="" />
                Courses
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/Admin/Payments'} >
                <img src={ern} alt="" />
                Payments
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5 items-center' : 'text-gray-400 w-full p-2.5 flex items-center gap-2.5'} to={'/Admin/instructorlist'} >
            <img src={user} alt="" />
            Instructors
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5 items-center' : 'text-gray-400 w-full p-2.5 flex items-center gap-2.5'} to={'/Admin/Students'} >
            <img src={user} alt="" />
            Students
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/Admin/settings'} >
            <img src={stng} alt="" />
                Settings</NavLink>
        </div>
    </div>
  )
}
