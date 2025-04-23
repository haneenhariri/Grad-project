import { ToastProvider } from "../utils/toast";
import { Outlet } from "react-router-dom";
import DashSide from "../instructorDash/DashSide";
import DashHead from "../instructorDash/DashHead";


export default function DashLayout() {
  return (
    <div className="flex h-auto ">
      <DashSide/>
      <div className="w-full ">
        <DashHead/>
        <div className=" p-4">
        <ToastProvider/>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}
