import { useEffect, useState } from "react";
import Button from "../Ui/Button/Button";
import img from "../assets/Search (1).png";
import axiosInstance from "../services/axiosInstance";
import axios from "axios";

interface Course {
  id: number;
  title: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  profile_picture?: string | null;
  courses: Course[];
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewDetailsPopup, setViewDetailsPopup] = useState<boolean>(false);
  const [viewCoursesPopup, setViewCoursesPopup] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [editData, setEditData] = useState({ name: "", email: "" });
  const addStudent = async () => {
    try {
      await axios.post("https://your-api-url.com/students", newStudent);
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding student", error);
    }
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get("/get-students");
        setStudents(response.data.data); 
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
 // تحديث القيم عند الكتابة في الحقول
 const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEditData({ ...editData, [e.target.name]: e.target.value });
};

// تحديث بيانات الطالب عند النقر على Save Changes
const handleEditSubmit = async () => {
  if (!selectedStudent) return;
  try {
    const response = await axiosInstance.put(
      `http://127.0.0.1:8000/api/users/${selectedStudent.id}?_method=PUT`,
      editData
    );

    if (response.data.status === "success") {
      // تحديث القائمة بدون الحاجة إلى إعادة تحميل البيانات
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id ? { ...student, ...editData } : student
        )
      );

      // إغلاق النافذة بعد التحديث
      setEditPopup(false);
    }
  } catch (error) {
    console.error("Error updating student:", error);
  }
}
const handelDelete = async () =>
{
  try{
    const response = await axiosInstance.delete(`http://127.0.0.1:8000/api/users/${selectedStudent?.id}`)
  }catch(error){
    console.error(error)
  }
}
  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <img src={img} alt="" className="border-2 border-violet-950" />
        <Button onClick={() => setShowPopup(true)} Bg="bg-btn text-white" text="Add Student"/>
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
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">{student.name}</td>
                  <td className="p-3 border-b text-sm border-gray-200">{student.email}</td>
                  <td className="p-3 border-b text-sm border-gray-200">
                    {student.courses.length > 0 ? (
                      <div>
                        {student.courses[0].title}{" "}
                        {student.courses.length > 1 && (
                          <button 
                            className="text-blue-500 block mt-2" 
                            onClick={() => {
                              setSelectedStudent(student);
                              setViewCoursesPopup(true);
                            }}
                          >
                            View Courses
                          </button>
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
                      <div className="absolute z-10 right-0 mt-2 w-44 bg-white border shadow-lg rounded-md">
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedStudent(student);
                            setViewDetailsPopup(true);
                          }}
                        >
                          View Details
                        </button>
                        <button
                                                  onClick={() => {
                                                    setSelectedStudent(student);
                                                    setEditData({ name: student.name, email: student.email });
                                                    setEditPopup(true);
                                                  }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                        onClick={ handelDelete}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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

      {/* Popup for Student Details */}
      {viewDetailsPopup && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Courses:</strong> {selectedStudent.courses.length > 0 ? selectedStudent.courses.map(c => c.title).join(", ") : "No courses"}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setViewDetailsPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup for Student Courses */}
      {viewCoursesPopup && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
            <ul className="list-disc pl-5">
              {selectedStudent.courses.map(course => (
                <li key={course.id}>{course.title}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setViewCoursesPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup لتعديل بيانات الطالب */}
      {editPopup && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setEditPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>)}
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3>Add Student</h3>
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={newStudent.password_confirmation}
            onChange={(e) => setNewStudent({ ...newStudent, password_confirmation: e.target.value })}
          />
          <button onClick={addStudent}>Save</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
