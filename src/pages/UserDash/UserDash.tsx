import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";


export default function UserDash() {
  return (
    <section className="  mt-[108px] p-5 bg-white rounded-md   my-10 lg:mx-20 desktop:mx-40 ">
       <ProfileHeader/>
       <Outlet/>
    </section>
  )
}
