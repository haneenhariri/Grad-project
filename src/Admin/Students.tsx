import { useState } from "react";
import Button from "../Ui/Button/Button";
import img from "../assets/Search (1).png";

interface Student {
  name: string;
  email: string;
  enrolledCourses: string[];
  registrationDate: string;
}

const studentsData: Student[] = [
  { 
    name: "John Doe", 
    email: "john@example.com", 
    enrolledCourses: ["web Development", "Course 2"], 
    registrationDate: "2023-08-12" 
  },
  { 
    name: "Jane Smith", 
    email: "jane@example.com", 
    enrolledCourses: ["web Development","Course 3"], 
    registrationDate: "2023-09-20" 
  },
  { 
    name: "Mark Johnson", 
    email: "mark@example.com", 
    enrolledCourses: ["Front-end Development", "Course 4"], 
    registrationDate: "2023-07-10" 
  },
  { 
    name: "John Doe", 
    email: "john@example.com", 
    enrolledCourses: ["web Development", "Course 2"], 
    registrationDate: "2023-08-12" 
  },
  { 
    name: "Jane Smith", 
    email: "jane@example.com", 
    enrolledCourses: ["web Development","Course 3"], 
    registrationDate: "2023-09-20" 
  },
  { 
    name: "Mark Johnson", 
    email: "mark@example.com", 
    enrolledCourses: ["Front-end Development", "Course 4"], 
    registrationDate: "2023-07-10" 
  },
  { 
    name: "John Doe", 
    email: "john@example.com", 
    enrolledCourses: ["web Development", "Course 2"], 
    registrationDate: "2023-08-12" 
  },
  { 
    name: "Jane Smith", 
    email: "jane@example.com", 
    enrolledCourses: ["web Development","Course 3"], 
    registrationDate: "2023-09-20" 
  },
  { 
    name: "Mark Johnson", 
    email: "mark@example.com", 
    enrolledCourses: ["Front-end Development", "Course 4"], 
    registrationDate: "2023-07-10" 
  },
];

export default function Students() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const deleteStudentAccount = (index: number) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };
  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <img src={img} alt="" className="border-2 border-violet-950" />
        <Button Bg="bg-btn" text="Add Student" textColor="text-white" />
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-3 text-gray-600 border-b border-gray-200">Name</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Email</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Enrolled Courses</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">{student.name}</td>
                  <td className="p-3 border-b text-sm border-gray-200">{student.email}</td>
                  <td className="p-3 border-b text-sm border-gray-200">
                    {student.enrolledCourses.length > 0 ? (
                      <div>
                        {student.enrolledCourses[0]}{" "}
                        {student.enrolledCourses.length > 1 && (
                          <a href="#" className="text-blue-500 block mt-2">View More</a>
                        )}
                      </div>
                    ) : (
                      "No courses"
                    )}
                  </td>
                  <td className="p-3 border-b text-sm border-gray-200 text-center relative">
                    <button
                      className="text-gray-500 text-sm hover:text-gray-700"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      &#8226;&#8226;&#8226;
                    </button>
                    {openDropdown === index && (
                      <div className="absolute z-10 right-0 mt-2 w-44 bg-white border-b border-gray-200 shadow-lg rounded-md">
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setOpenDetails(openDetails === index ? null : index)}
                        >
                          View Details
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          onClick={() => deleteStudentAccount(index)}
                        >
                          Delete
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

      {openDetails !== null && (
        <div className="p-6 bg-white rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-4">Student Details</h2>
          <div>
            <p><strong>Name:</strong> {students[openDetails].name}</p>
            <p><strong>Email:</strong> {students[openDetails].email}</p>
            <p><strong>Registration Date:</strong> {students[openDetails].registrationDate}</p>
            <p><strong>Enrolled Courses:</strong> {students[openDetails].enrolledCourses.join(", ")}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setOpenDetails(null)}
          >
            Close
          </button>
        </div>
      )}
    </>
  )
}
