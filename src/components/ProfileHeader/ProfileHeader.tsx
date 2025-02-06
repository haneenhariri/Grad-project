import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Ui/Button/Button";
import profile from '../../assets/photo_2024-03-09_22-37-44.jpg'
export default function ProfileHeader() {
    const navigate = useNavigate()
    const handlebtn = () => {
        navigate("/Instructor");
    }
    
  return (
    <div className=" ">
      <div className="p-10 flex justify-between items-center border  border-b-0 px-5 border-violet-400">
        <div className="flex gap-5 items-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-violet-950 text-white text-lg" > h </div>
            <div>
                <h3 className=" mb-2">Haneen Al-Hariri</h3>
                <p className=" text-base text-gray-600">Web Designer</p>
            </div>
        </div>
        <Button onClick={handlebtn} text="Become Instructor" Bg="bg-btn" textColor="text-white"/>
      </div>
      {/* tabs */}
      <div className="flex items-center gap-6  border px-5 border-violet-400 ">
        <NavLink
            to="/User/settings"
            className={({ isActive }) =>
              `text-center w-1/2 text-base h-full py-2.5 ${
                isActive
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : ""
              }`
            }
          >
         Settings
        </NavLink>
        <NavLink
            to="/User/usercourse"
            className={({ isActive }) =>
              `text-center w-1/2 text-base h-full py-2.5 ${
                isActive
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : ""
              }`
            }
          >
         My Courses
        </NavLink>
      </div>
    </div>
  )
}
