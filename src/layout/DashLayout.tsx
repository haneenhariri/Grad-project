import { Outlet } from "react-router-dom";
import DashSide from "../Dashboard/DashSide";
import DashHead from "../Dashboard/DashHead";


export default function DashLayout() {
  return (
    <div className=" flex ">
      <DashSide/>
      <div className="w-full">
        <DashHead/>
        <div className="lg:px-10 px-5 py-4">
        <Outlet/>
        </div>
      </div>
    </div>
  )
}
