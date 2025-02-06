import { useNavigate } from "react-router-dom"
import HeroPic  from "../../../src/assets/instructor/heroinstructor.png"
import Button from "../../Ui/Button/Button"
export default function HeroInstructure() {
  const navigate = useNavigate()
  const handelNav = () =>
  {
    navigate('/InstructorForm')
  }
  return (
    <section className=" flex justify-between items-center px-4 lg:px-20 desktop:px-40 h-full py-9">
        {/* left div */}
      <div className="w-1/2  ">
        <h3 className="text-5xl	mb-8 ">Become an Instuctor</h3>
        <p className="text-xl text-gray-500 leading-8 mb-10 ">Become an instructor & start teaching with 26k certified instructors. Create a success story with 67.1k Students — Grow yourself with 71 countries.</p>
        <Button text='Get Started' Bg='bg-btn w-1/3' textColor='text-white' onClick={handelNav} />
 
      </div>
      {/* right left */}
      <img src={HeroPic} alt="a student" className="w-5/12"/>

    </section>
  )
}
