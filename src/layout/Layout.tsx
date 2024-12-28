import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";


export default function Layout() {
  return (
    <div className="text-lg">
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
