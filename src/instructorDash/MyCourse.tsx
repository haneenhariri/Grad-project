import { useEffect, useState } from 'react';
import { fetchMyCourses } from '../services/profileStd';
import { deleteCourse } from '../services/courses';
import {  useNavigate } from 'react-router-dom';
import { myCourseProp } from '../types/interfaces';



export default function MyCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<myCourseProp[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const lang = localStorage.getItem('language') as 'ar' | 'en' || 'en';
  const handleDeleteCourse = async ( id : number ) => {
    try {
      await deleteCourse(id); 
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));  
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
    useEffect(() => {
      const getCourses = async () => {
        try {
          const myCourses = await fetchMyCourses();
          console.log("courses",myCourses)
          setCourses(myCourses);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      getCourses();
    }, []);
  return (
    <div>
        <div className="grid grid-cols-3 my-5 gap-5">
          {courses?.map((course, index) => (
              <div key={index} className=" p-5 bg-gray-300/15 rounded-lg">
                <img src={`http://127.0.0.1:8000/storage/${course?.cover}`} alt={course.title[lang]} className="w-full h-48" />
                <div className=" flex justify-between my-5">
                 <div className=" flex gap-2">
                   <span className=" p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">{course.duration} weeks</span>
                   <span className=" p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">{course.level} </span>
                 </div>
                 <div className=' relative'>
                 <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      &#8226;&#8226;&#8226;
                    </button>
                    {openDropdown === index && (
                      <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/instruct/detail/${course.id}`)}>
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                 </div>
                </div>
                <h3 className="font-bold text-xl mb-2.5">{course.title[lang]}</h3> 
                <p className="text-sm text-gray-600 mb-5 line-clamp-2">{course.description[lang]}</p> 
                </div>
          ))}
        </div>
    </div>
  )
}
