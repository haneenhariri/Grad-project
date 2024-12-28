import { useNavigate } from 'react-router-dom';
import instruct from '../../assets/Union.png'
import Button from '../../Ui/Button/Button'

export default function Instuctor() {
  const navigate = useNavigate();
  const handleViewAllCourses = () => {
      navigate("/Instructor");
  }
  return (
    <section className=" my-20 flex items-center ">
      <div className=" w-1/2">
        <img src={instruct} alt="" className=' w-10/12' />
      </div>
      <div className=' w-1/2 flex flex-col justify-center items-center' >
        <h2  className=" mb-7.5  font-semibold text-3xl text-[#0A033C]" >Become an Instuctor</h2>
        <p className=' mb-7.5 text-base w-10/12 text-center'>Become an instructor & start teaching with 26k certified instructors. Create a success story with 67.1k Students — Grow yourself with 71 countries.</p>
        <button>
        
        </button>
          <Button text={"Start teaching"} Bg="bg-btn" textColor="text-white" onClick={handleViewAllCourses} />
      </div>
    </section>
  )
}
