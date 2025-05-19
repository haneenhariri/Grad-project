import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";


export default function UserDash() {
  return (
    <div className="min-h-screen relative">
      {/* شريط علوي بخلفية وردية فاتحة */}
      <div className="w-full   top-0 h-72 bg-[#f0e6ff]"></div>
      
      <div className="px-4 lg:px-10 desktop:px-40 -mt-44">
        <section className="rounded-md shadow-sm my-10 ">
          <ProfileHeader/>
          <Outlet/>
        </section>
      </div>
    </div>
  )
}
