import { useNavigate } from 'react-router-dom';
import Button from "../../Ui/Button/Button"
export default function FooterSup() {
    const navigate = useNavigate();
    const handleJoin = () => {
      navigate("/auth/login");
  }
  const handleViewAllCourses = () => {
    navigate("/courses");
  }
  return (
    <div className="bg-gray-900  text-white px-4 flex-wrap  lg:px-20  desktop:px-40  gap-10 lg:py-20 py-10 flex lg:flex-row flex-col lg:items-center justify-between border-b border-gray-700">
    <div className=" lg:w-5/12 w-full font-semibold ">
    <h2 className="lg:text-[35px] lg:leading-[45px] text-2xl ">Start learning with 67.1k students around the world.</h2>
    <div className=" flex flex-wrap gap-5 mt-7.5">
    <Button text="Join the Family" Bg="bg-btn" onClick={handleJoin} textColor=""/>
    <Button text="Browse all courses" Bg="bg-White/95" onClick={handleViewAllCourses} textColor=" text-gray-900"/>
    </div>
    </div>
    <div className="w-1/2 flex-wrap flex justify-evenly gap-3.5">
    <div className="">
        <h2 className="lg:text-[35px] text-lg  font-bold mb-2.5">6.3k</h2>
        <p className=" text-base text-gray-500">Online courses</p>
    </div>
    <div className="">
        <h2 className="lg:text-[35px] text-lg font-bold mb-2.5">6.3k</h2>
        <p className=" text-base text-gray-500">Online courses</p>
    </div>
    <div className="">
        <h2 className="lg:text-[35px] text-lg font-bold mb-2.5">6.3k</h2>
        <p className=" text-base text-gray-500">Online courses</p>
    </div>
    </div>
</div>
  )
}
