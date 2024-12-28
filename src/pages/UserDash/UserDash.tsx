import { Outlet } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import './UserDash.css'
export default function UserDash() {
  return (
    <section className="dash px-4 lg:px-20 desktop:px-40 flex gap-7">
       <Profile/>
       <Outlet/>
    </section>
  )
}
