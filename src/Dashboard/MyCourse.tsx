import fliter from '../assets/Filter.png'
import { courseData } from '../data/Courses'
import { Link } from 'react-router-dom'


export default function MyCourse() {
  return (
    <div>
        <img src={fliter} alt="" />
            <div
                 className={`grid grid-cols-3 gap-4 mt-4 w-full`}
               >
                 {courseData.slice(0,8).map((course, index) => (
                    <Link to={`detail/${course.id}`}  key={index} className="  p-2.5 bg-white rounded-lg">
                       <img src={course.img} alt={course.title} className=" rounded-md w-full h-48" />
                       <div className=" flex justify-between my-2 border w-max bg-violet-400/15 rounded-sm p-1">
                        <span className='text-sm '>Developments</span>
                       </div>
                       <h3 className=" font-semibold text-base mb-1">{course.title}</h3>
                    </Link>
                 ))}
                
               </div>
    </div>
  )
}
