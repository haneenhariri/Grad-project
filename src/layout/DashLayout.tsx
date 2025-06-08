import { ToastProvider } from "../utils/toast";
import { Outlet } from "react-router-dom";
import DashSide from "../instructorDash/DashSide";
import DashHead from "../instructorDash/DashHead";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";


export default function DashLayout() {
  return (
    <div className="flex ">
      <ScrollToTop />
      <DashSide/>
      <div className="w-full ">
        <DashHead/>
        <div className="p-4">
        <ToastProvider/>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}
