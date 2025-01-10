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
        <h2 className="mb-6">Dashboard</h2>
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
      <h2 className="mb-6">Let’s start learning</h2>
      <div className=' flex justify-between gap-5'>
        {courseData.slice(0,3).map((e, i) => (
        <CourseCard
                    id={e.id}
                    key={i}
                    img={e.img}
                    weeks={e.weeks}
                    level={e.level}
                    instructor={e.instructor}
                    title={e.title}
                    des={e.des}
                  />
        ))}
      </div>
      </div>
    </div>
  )
}
