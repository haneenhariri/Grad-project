import { useEffect, useState } from "react";
import { fetchMyCourses } from "../../services/profileStd";
import { CouCard } from "../../types/interfaces";


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
      {courses?.length === 0 ? (
        <p className="text-gray-500">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {courses?.map((course, index) => (
            <div key={index} className="p-5 bg-gray-100 rounded-lg shadow-md">
              <img src={course.img} alt={course.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="font-semibold text-lg mt-4">{course.title}</h3>
              <p className="text-sm text-gray-700">{course.instructor}</p>
              <button className="mt-4 bg-violet-600 text-white py-2 px-4 w-full rounded-md">
                Watch Lecture
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
