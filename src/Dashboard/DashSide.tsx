import { NavLink } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import dash from "../assets/ChartBar.png";
import add from "../assets/PlusCircle.png";
import my from "../assets/Stack.png";
import ern from "../assets/CreditCard (1).png";
import stng from "../assets/Gear.png";
import Logo from "../Ui/Logo/Logo";

export default function DashSide() {
  return (
    <div className=" w-2/12 bg-gray-900 lg:block hidden ">
        <div className="flex text-white items-center  p-2.5 border-b gap-2.5">
          <Logo/>
        </div>
        <div className=" flex flex-col items-center gap-2.5 py-4 text-sm">
            <NavLink className={({ isActive }) => isActive ? ' bg-violet-600 text-white w-full p-2.5 flex gap-2.5 ' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/instruct/dash'} >
                <img src={dash} alt="" />
                Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/instruct/Create'} >
                <img src={add} alt="" />
                Create New Course
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/instruct/Earning'} >
                <img src={ern} alt="" />
                Earning
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/instruct/MyCourses'} >
                <img src={my} alt="" />
                My Courses</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'bg-violet-600 text-white w-full p-2.5 flex gap-2.5' : 'text-gray-400 w-full p-2.5 flex gap-2.5'} to={'/instruct/settings'} >
            <img src={stng} alt="" />
                Settings</NavLink>
        </div>
    </div>
  )
}
