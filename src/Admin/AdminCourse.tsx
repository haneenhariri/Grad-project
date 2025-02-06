import React, { useState } from "react";
import Button from "../Ui/Button/Button";
import filter from "../assets/Faders.png";


interface Course {
    name: string;
    category: string;
    instructor: string;
    lesson: number;
    status: "Active" | "Pending";
    price: string;
    deadline: string;
  }
  
  const coursesData: Course[] = [
    { name: "Responsive Design", category: "Web Development", instructor: "Alex Ashley", lesson: 32, status: "Active", price: "$30", deadline: "20.4.2021" },
    { name: "Android Development", category: "Mobile Application", instructor: "Michael Wood", lesson: 11, status: "Pending", price: "$65", deadline: "10.5.2021" },
    { name: "UI/UX Design", category: "Graphics Design", instructor: "Abu Bin Istiak", lesson: 12, status: "Active", price: "$20", deadline: "15.4.2021" },
    { name: "WordPress Theme Development", category: "Web Development", instructor: "Emily Smith", lesson: 24, status: "Active", price: "$50", deadline: "20.4.2021" },
    { name: "Android Development", category: "Mobile Application", instructor: "Michael Wood", lesson: 11, status: "Pending", price: "$65", deadline: "10.5.2021" },
    { name: "Android Development", category: "Mobile Application", instructor: "Michael Wood", lesson: 11, status: "Pending", price: "$65", deadline: "10.5.2021" },

    { name: "WordPress Theme Development", category: "Web Development", instructor: "Emily Smith", lesson: 24, status: "Active", price: "$50", deadline: "20.4.2021" },
    { name: "WordPress Theme Development", category: "Web Development", instructor: "Emily Smith", lesson: 24, status: "Active", price: "$50", deadline: "20.4.2021" },
    { name: "WordPress Theme Development", category: "Web Development", instructor: "Emily Smith", lesson: 24, status: "Active", price: "$50", deadline: "20.4.2021" },
  ];
export default function AdminCourse() {
    const [courses, setCourses] = useState<Course[]>(coursesData);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const updateCourseStatus = (index: number, status: "Active" | "Pending") => {
        const updatedCourses = courses.map((course, i) =>
          i === index ? { ...course, status } : course
        );
        setCourses(updatedCourses);
      };
  return (
    <>
    <div className=" flex gap-4 justify-end mb-4">
        <button
          className="flex gap-2.5 items-center py-2.5 rounded-md px-5 border border-violet-950"
        >
          <img src={filter} alt="filter" />
          Filter
        </button>
        <Button Bg="bg-btn" text="Add Course" textColor="text-white"/>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto border-b ">
        <table className="w-full ">
          <thead>
            <tr className=" text-left border-b border-gray-200">
              <th className="p-3 text-gray-600">Course Name</th>
              <th className="p-3 text-gray-600 ">Category</th>
              <th className="p-3 text-gray-600 ">Instructor</th>
              <th className="p-3 text-gray-600 ">Lesson</th>
              <th className="p-3 text-gray-600 ">Status</th>
              <th className="p-3 text-gray-600 ">Price</th>
              <th className="p-3 text-gray-600 ">Deadline</th>
              <th className="p-3 text-gray-600 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 ">{course.name}</td>
                <td className="p-3 text-sm text-gray-700">{course.category}</td>
                <td className="p-3 text-sm text-gray-700">{course.instructor}</td>
                <td className="p-3 text-sm text-gray-700">{course.lesson}</td>
                <td className={`p-3  text-sm text-gray-700 font-semibold `}> <span className={`${course.status === "Active" ? "text-green-600 bg-green-100 px-2 py-1 rounded-md" : "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md"}`}>{course.status}</span></td>
                <td className="p-3 text-sm text-gray-700">{course.price}</td>
                <td className="p-3 text-sm text-gray-700">{course.deadline}</td>
                <td className="p-3 text-sm text-gray-700 text-center relative">
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
                    &#8226;&#8226;&#8226;
                  </button>
                  {openDropdown === index && (
                    <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                      <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</button>
                      <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button>
                      <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100" onClick={() => updateCourseStatus(index, "Active")}>
                        Approve
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100" onClick={() => updateCourseStatus(index, "Pending")}>
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
  )
}
