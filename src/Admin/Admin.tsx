import { Outlet } from "react-router-dom";
import AdminSide from "./AdminSide";
import AdminHead from "./AdminHead";
import { ToastProvider } from "../utils/toast";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";


export default function Admin() {
  return (
    <div className=" flex ">
      <ScrollToTop />
      <AdminSide/>
      <div className="w-full">
        <AdminHead/>
        <div className="px-10 py-4">
        <Outlet/>
        <ToastProvider/>
        </div>
      </div>
    </div>
  )
}
