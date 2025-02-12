import { useEffect, useState } from "react";
import Button from "../Ui/Button/Button";
import filter from "../assets/Faders.png";
import { allCategories, allCourses, changeStatusCourse, deleteCourse, pendingCourse } from "../services/courses"; // استيراد دالة الحذف
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  instructor: string;
  status: "accepted" | "pending" | "rejected";
  category_id: string;
  rating: string | null;
  description: string;
  price: string;
  title: string;
  duration: string;
  level: string;
}
interface Category {
  id: number;
  name: string;
}
export default function AdminCourse() {
  const [categories, setCategories] = useState<Category[]>([]); 
  const [courses, setCourses] = useState<Course[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navigate = useNavigate()
  const updateCourseStatus = async (id: number, status: "accepted" | "rejected") => {
    try {
      await changeStatusCourse({ id, status }); 
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, status } : course
        )
      );
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      await deleteCourse(id); 
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));  
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [allCoursesResponse, pendingCoursesResponse] = await Promise.all([
          allCourses(),
          pendingCourse()
        ]);
  
        const formattedData: Course[] = [...allCoursesResponse, ...pendingCoursesResponse].map((item: any) => ({
          id: item.id,
          instructor: item.instructor,
          status: item.status,
          category_id: item.category_id.toString(),
          rating: item.rating,
          description: item.description,
          price: item.price.toString(),
          title: item.title,
          duration: item.duration.toString(),
          level: item.level,
        }));
  
        setCourses(formattedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const response = await allCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCourses();
    fetchCategories();
  }, []);
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id.toString() === categoryId);
    return category ? category.name : "Unknown";
  };
  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <button className="flex gap-2.5 items-center py-2.5 rounded-md px-5 border border-violet-950">
          <img src={filter} alt="filter" />
          Filter
        </button>
        <Button Bg="bg-btn" text="Add Course" textColor="text-white" onClick={() => navigate('/Admin/Create')} />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto border-b">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="p-3 text-gray-600">Course Name</th>
                <th className="p-3 text-gray-600">Category</th>
                <th className="p-3 text-gray-600">Instructor</th>
                <th className="p-3 text-gray-600">Duration</th>
                <th className="p-3 text-gray-600">Level</th>
                <th className="p-3 text-gray-600">Status</th>
                <th className="p-3 text-gray-600">Price</th>
                <th className="p-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{course.title}</td>
                  <td className="p-3 text-sm text-gray-700">{getCategoryName(course.category_id)}</td>
                  <td className="p-3 text-sm text-gray-700">{course.instructor}</td>
                  <td className="p-3 text-sm text-gray-700">{course.duration} weeks</td>
                  <td className="p-3 text-sm text-gray-700">{course.level}</td>
                  <td className="p-3 text-sm text-gray-700 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        course.status === "accepted"
                          ? "text-green-600 bg-green-100"
                          : course.status === "pending"
                          ? "text-yellow-600 bg-yellow-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">${course.price}</td>
                  <td className="p-3 text-sm text-gray-700 text-center relative">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      &#8226;&#8226;&#8226;
                    </button>
                    {openDropdown === index && (
                      <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                          onClick={() => updateCourseStatus(course.id, "accepted")}
                        >
                          Approve
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100"
                          onClick={() => updateCourseStatus(course.id, "rejected")}
                        >
                          Reject
                        </button>

                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
