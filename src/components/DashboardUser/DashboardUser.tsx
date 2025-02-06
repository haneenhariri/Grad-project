import play from '../../assets/icons/PlayCircle.png'
import check from '../../assets/icons/CheckSquareOffset.png'
import achiv from '../../assets/icons/Trophy.png'
import note from '../../assets/icons/Notebook.png'
import { courseData } from '../../data/Courses'
import CourseCard from '../CourseCrad/CourseCard'

export default function DashboardUser() {
  return (
    <div className=" my-10">
      <div className='mb-10'>
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <div className="flex items-center gap-6">
            <div className=" flex items-center  w-1/4 p-5 bg-pink-300/25 gap-6">
                <div className=" p-3.5 bg-white">
                    <img src={play} alt="" className='w-6 h-6' />
                </div>
                <div>
                    <h3>957</h3>
                    <p className=' text-sm text-gray-500'>Enrolled Courses</p>
                </div>
            </div>
            <div className=" flex items-center  w-1/4 p-5 bg-blue-300/25 gap-6">
                <div className=" p-3.5 bg-white">
                    <img src={check} alt="" className='w-6 h-6' />
                </div>
                <div>
                    <h3>9</h3>
                    <p className=' text-sm text-gray-500'>Active Courses</p>
                </div>
            </div>
            <div className=" flex items-center  w-1/4 p-5 bg-orange-300/25 gap-6">
                <div className=" p-3.5 bg-white">
                    <img src={note} alt="" className='w-6 h-6' />
                </div>
                <div>
                    <h3>951</h3>
                    <p className=' text-sm text-gray-500'>Certificates</p>
                </div>
            </div>
            <div className=" flex items-center  w-1/4 p-5 bg-green-300/25 gap-6">
                <div className=" p-3.5 bg-white">
                    <img src={achiv} alt="" className='w-6 h-6' />
                </div>
                <div>
                    <h3>951</h3>
                    <p className=' text-sm text-gray-500'>Completed Courses</p>
                </div>
            </div>
        </div>
      </div>
      <div>
      <h2 className="text-2xl font-semibold mb-6">Let’s start learning</h2>
      <div className=' flex justify-between gap-5'>
        {courseData.slice(0,1).map((e, i) => (
            <div key={i} className=" p-5 bg-gray-h rounded-lg">
            <img src={e.img} alt={e.title} className="w-full h-48" />
            <div className=" flex justify-between my-5">

            <p className=" font-semibold text-sm">{e.instructor}</p>
            </div>
            <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
            <div className=" flex justify-between items-center my-5">
            <button  className=" bg-white shadow-md text-sm font-medium p-3.5 w-full rounded-md text-center">Watch Lecture</button>

            </div>
        </div>
        ))}
        {courseData.slice(1,2).map((e, i) => (
            <div key={i} className=" p-5 bg-white rounded-lg ">
            <img src={e.img} alt={e.title} className="w-full h-48" />
            <div className=" flex justify-between my-5">
            <p className=" font-semibold text-sm">{e.instructor}</p>
            </div>
            <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
            <div className=" flex justify-between items-center my-5">
            <button  className=" bg-White/95 text-sm font-medium p-3.5 rounded-md text-center">Watch Lecture</button>
            <p className=' text-base text-green-500'>61% Completed</p>
            </div>
           
        </div>
        ))}
        {courseData.slice(3,4).map((e, i) => (
            <div key={i} className=" p-5 bg-white rounded-lg">
            <img src={e.img} alt={e.title} className="w-full h-48" />
            <div className=" flex justify-between my-5">
            <p className=" font-semibold text-sm">{e.instructor}</p>
            </div>
            <h3 className=" font-semibold text-xl mb-2.5">{e.title}</h3>
            <div className=" flex justify-between items-center my-5">
            <button  className=" bg-White/95 text-sm font-medium p-3.5 rounded-md text-center">Watch Lecture</button>
            <p className=' text-base text-green-500'>81% Completed</p>
            </div>
        </div>
        ))}
        
      </div>
      </div>
    </div>
  )
}
 