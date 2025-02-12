import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { ToastProvider } from "../utils/toast";


export default function Layout() {
  return (
    <div className="text-lg">
      <NavBar/>
      <Outlet/>
      <ToastProvider/>
      <Footer/>
    </div>
  )
}
