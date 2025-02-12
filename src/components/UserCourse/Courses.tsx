import { useEffect, useState } from "react";
import { fetchMyCourses } from "../../services/profileStd";
import { CouCard } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";


export default function MyCourses() {
  const [courses, setCourses] = useState<CouCard[]>([]);

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
    <div className="py-10 p-5 border border-violet-400 rounded-b">  
      {courses?.length === 0 ?
       ( <Spinner/>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {courses?.map((course, index) => (
              <div key={index} className=" p-5 bg-gray-300/15 rounded-lg">
                <img src={`http://127.0.0.1:8000/storage/${course?.cover}`} alt={course.title} className="w-full h-48" />
                <div className=" flex justify-between my-5">
                 <div className=" flex gap-2">
                   <span className=" p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">{course.duration} weeks</span>
                   <span className=" p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">{course.level} </span>
                 </div>
                 <p className=" font-semibold text-sm">{course?.instructor}</p>
                </div>
                <h3 className=" font-bold text-xl mb-2.5">{course?.title}</h3>
                <p className=" text-sm text-gray-600 mb-5 line-clamp-2">{course.description}</p>
                <Link to={`/watch/${course.id}`}  className=" bg-White/95 text-sm font-medium p-3.5 rounded-md block text-center">Watch now</Link>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
