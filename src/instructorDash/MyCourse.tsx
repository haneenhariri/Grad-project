import { useEffect, useState } from 'react';
import { CouCard } from '../types/interfaces';
import { fetchMyCourses } from '../services/profileStd';
import { deleteCourse } from '../services/courses';
import { useNavigate, useParams } from 'react-router-dom';


export default function MyCourse() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
    const [courses, setCourses] = useState<CouCard[]>([]);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>('en');  // تحديد اللغة

  const handleDeleteCourse = async (id: number) => {
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
                <img src={`http://127.0.0.1:8000/storage/${course?.cover}`} alt={course.title} className="w-full h-48" />
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
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/instruct/MyCourses/detail/${course.id}`)}>
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
                <h3 className="font-bold text-xl mb-2.5">{course.title[language]}</h3> {/* اختيار العنوان بناءً على اللغة */}
                <p className="text-sm text-gray-600 mb-5 line-clamp-2">{course.description[language]}</p> {/* اختيار الوصف بناءً على اللغة */}
                </div>
          ))}
        </div>
    </div>
  )
}
