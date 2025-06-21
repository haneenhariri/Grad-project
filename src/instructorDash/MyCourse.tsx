import { useEffect, useState } from "react";
import { fetchMyCourses } from "../services/profileStd";
import { deleteCourse } from "../services/courses";
import { useNavigate } from "react-router-dom";
import { myCourseProp } from "../types/interfaces";
import { useTranslation } from "react-i18next";
import Button from "../Ui/Button/Button";
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

export default function MyCourse() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courses, setCourses] = useState<myCourseProp[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const lang = (localStorage.getItem("language") as "ar" | "en") || "en";
  const handleDeleteCourse = async (id: number) => {
    try {
      await deleteCourse(id);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  useEffect(() => {
    const getCourses = async () => {
      try {
        const myCourses = await fetchMyCourses();
        console.log("courses", myCourses);
        setCourses(myCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);
  if (courses.length === 0) {
    return (
      <div className=" h-[80vh] flex justify-center items-center">
        <div className="bg-white shadow-sm gap-6  rounded-sm p-6 w-1/2 h-1/2   flex flex-col justify-center items-center">
          <h1 className=" text-3xl font-semibold mb-6">
            {t("You don't have any courses yet.")}
          </h1>
          <Button
            text="Create a New Course"
            Bg=" text-white bg-btn"
            onClick={() => navigate("/instruct/Create")}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {courses?.map((course, index) => (
          <div key={index} className=" p-5 bg-gray-300/15 rounded-lg">
            <img
              src={`http://127.0.0.1:8000/storage/${course?.cover}`}
              alt={course.title[lang]}
              className="w-full h-48"
            />
            <div className=" flex justify-between my-5">
              <div className=" flex gap-2">
                <span className=" p-1 bg-violet-600/10 border-violet-950 border text-xs rounded-md">
                  {course.duration} {t("weeks")}
                </span>
                <span className=" p-1 bg-green-600/10 border-green-950 border text-xs rounded-md">
                  {t(`CoursesSection.levels.${course.level}`)} 
                </span>
              </div>
              <div className=" relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  &#8226;&#8226;&#8226;
                </button>
                {openDropdown === index && (
                  <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => navigate(`/instruct/detail/${course.id}`)}
                    >
                      {t("Edit")}
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      {t("Delete")}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2.5">{course.title[lang]}</h3>
            <p className="text-sm text-gray-600 mb-5 line-clamp-2">
              {course.description[lang]}
            </p>
          </div>
        ))}
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
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
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/instruct/detail/${course.id}`)}>
                          <FiEdit2 size={16} className="mr-2 text-green-500" />
                          <span>Edit </span>
                        </button>
                        <button className=" items-center flex gap-1 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/instruct/detail/${course.id}`)}>
                          <FiEye size={16} className="mr-2 text-blue-500" />
                          <span>View</span>
                        </button>
                        <button
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <FiTrash2 size={16} className="mr-2" />
                          <span>Delete</span>
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
  );
}
