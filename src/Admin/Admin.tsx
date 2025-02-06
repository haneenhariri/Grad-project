import { Outlet } from "react-router-dom";
import AdminSide from "./AdminSide";
import AdminHead from "./AdminHead";


export default function Admin() {
  return (
    <div className=" flex ">
      <AdminSide/>
      <div className="w-full">
        <AdminHead/>
        <div className="px-10 py-4">
        <Outlet/>
        </div>
      </div>
    </div>
  )
}
