import { NavLink, useNavigate } from "react-router-dom"
import Button from "../../Ui/Button/Button"
import logo from "../../assets/logo/logo.png";
import face from "../../assets/social/face.png";
import inst from "../../assets/social/Instragarm.png";
import linked from "../../assets/social/Linkedin.png";
import twitter from "../../assets/social/Twitter (1).svg";
import youtub from "../../assets/social/Frame 74.svg";
export default function Footer() {
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate("/auth/login");
}
const handleViewAllCourses = () => {
  navigate("/courses");
}
  return (
    <footer className="bg-gray-900  text-white">
        <div className="px-4  lg:px-20  desktop:px-40  gap-10 py-20 flex items-center justify-between border-b border-gray-700">
            <div className=" w-5/12 font-semibold ">
            <h2 className="text-[35px] leading-[45px] ">Start learning with 67.1k students around the world.</h2>
            <div className=" flex gap-5 mt-7.5">
            <Button text="Join the Family" Bg="bg-btn" onClick={handleJoin} textColor=""/>
            <Button text="Browse all courses" Bg="bg-White/95" onClick={handleViewAllCourses} textColor=" text-gray-900"/>
            </div>
            </div>
            <div className="w-1/2 flex justify-evenly gap-3.5">
            <div className="">
                <h2 className="text-[35px] font-bold mb-2.5">6.3k</h2>
                <p className=" text-base text-gray-500">Online courses</p>
            </div>
            <div className="">
                <h2 className="text-[35px] font-bold mb-2.5">6.3k</h2>
                <p className=" text-base text-gray-500">Online courses</p>
            </div>
            <div className="">
                <h2 className="text-[35px] font-bold mb-2.5">6.3k</h2>
                <p className=" text-base text-gray-500">Online courses</p>
            </div>
            </div>
        </div>
      <div  className="px-4 lg:px-20 desktop:px-40 py-20 flex justify-between border-b border-gray-700">
        <div className="w-5/12 ">
        <div className="flex items-center mb-7.5 gap-1">
          <img src={logo} alt="logo" className="md:w-10 md:h-10 w-7.5 h-7.5" />
          <h1 className="font-semibold md:text-[30px] text-2xl">Orbah</h1>
        </div>
         <p className="text-sm text-gray-500 mb-7.5">Learn from Industry Experts and Enhance Your Skills.</p>
         <div className=" flex gap-2.5">
          <div className="p-2.5 bg-slate-800 w-max"><img src={face} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={inst} alt="" /></div>
          <div className="p-2.5 bg-btn w-max"><img src={linked} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={twitter} alt="" /></div>
          <div className="p-2.5 bg-slate-800 w-max"><img src={youtub} alt="" /></div>

         </div>
        </div>
        <div className="w-1/2 flex justify-evenly gap-3.5">
        <div>
            <h3 className=" text-base font-normal mb-5">Top 4 Category</h3>
            <p className="text-sm font-normal text-gray-500 mb-2" >Web Development</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >Design</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >AI</p>
            <p className="text-sm font-normal text-gray-500  mb-2" >Mobile Development</p>
        </div>
        <div>
            <h3 className=" text-base font-normal mb-5">Quick Links</h3>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>About</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Become Instructor</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Contact</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Home</NavLink>
        </div>
        <div>
            <h3 className=" text-base font-normal mb-5">Support</h3>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Help Center</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>FAQs</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Terms & Condition</NavLink>
            <NavLink className="text-sm block font-normal text-gray-500 mb-2" to={"/about"}>Privacy Policy</NavLink>
        </div>
        </div>

      </div>
    </footer>
  )
}
