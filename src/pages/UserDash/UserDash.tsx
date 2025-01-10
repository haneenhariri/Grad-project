import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";


export default function UserDash() {
  return (
    <section className="px-4 bg-custom-bg bg-no-repeat bg-top    py-10 lg:px-20 desktop:px-40 ">
       <ProfileHeader/>
       <Outlet/>
      
    </section>
  )
}
