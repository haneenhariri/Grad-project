import { useEffect, useState } from "react";
import Button from "../Ui/Button/Button";
import { allRequest, allTeacher } from "../services/teacherForm";
import axios from "axios";
import { getSecureCookie } from "../utils/cookiesHelper";

interface Instructor {
  id: number;
  name: string;
  email: string;
  education: string;
  specialization: string;
  summery: string;
  cv: string;
  status: "accepted" | "pending" | "rejected";
}

export default function InstructorList() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const addTeach = async () => {
    try {
      await axios.post("https://your-api-url.com/students", newStudent);
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding student", error);
    }
  };
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const [requestRes, teacherRes] = await Promise.all([allRequest(), allTeacher()]);

        const formatData = (data: any[]): Instructor[] =>
          data.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            education: item.education,
            specialization: item.specialization,
            summery: item.summery,
            cv: item.cv,
            status: item.status === "pending" ? "pending" : item.status === "rejected" ? "rejected" : "accepted",
          }));

        const mergedData = [...formatData(requestRes.data), ...formatData(teacherRes.data)];

        setInstructors(mergedData);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const token = getSecureCookie("token");

  const updateInstructorStatus = async (id: number, status: "accepted" | "rejected") => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/requests/${id}/change-status`, { status }, { 
        headers: { "Authorization": `Bearer ${token}` } 
      });

      setInstructors((prev) =>
        prev.map((instructor) => (instructor.id === id ? { ...instructor, status } : instructor))
      );

      setSelectedInstructor(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.education.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-4 justify-end mb-4">
        <div className="border-2 border-violet-950 p-3">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent h-full w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button Bg="bg-btn" text="Add Instructor" textColor="text-white" />
      </div>
      
      <div className="p-6 h-screen bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full h-full">
            <thead>
              <tr className="text-left">
                <th className="p-3 text-gray-600 border-b border-gray-200">Name</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Email</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Profile</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Education</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Status</th>
                <th className="p-3 text-gray-600 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{instructor.name}</td>
                  <td className="p-3 text-sm">{instructor.email}</td>
                  <td className="p-3 text-sm">
                    <button onClick={() => setSelectedInstructor(instructor)} className="text-blue-600">View</button>
                  </td>
                  <td className="p-3 text-sm">{instructor.education}</td>
                  <td className="p-3 text-sm font-semibold">
                    <span className={`${instructor.status === "accepted" ? "text-green-600 bg-green-100 px-2 py-1 rounded-md" 
                      : instructor.status === "rejected" ? "text-red-600 bg-red-100 px-2 py-1 rounded-md" 
                      : "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md"}`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-center relative">
                    <button className="text-gray-500 text-sm hover:text-gray-700" 
                      onClick={() => setOpenDropdown(openDropdown === instructor.id ? null : instructor.id)}>
                      &#8226;&#8226;&#8226;
                    </button>
                    {openDropdown === instructor.id && (
                      <div className="absolute z-10 right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md">
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</button>
                        <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInstructor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Instructor Details</h2>
            <p><strong>Name:</strong> {selectedInstructor.name}</p>
            <p><strong>Email:</strong> {selectedInstructor.email}</p>
            <p><strong>Education:</strong> {selectedInstructor.education}</p>
            <p><strong>Specialization:</strong> {selectedInstructor.specialization}</p>
            <p><strong>Summary:</strong> {selectedInstructor.summery}</p>
            <p><strong>CV:</strong> <a href={`/${selectedInstructor.cv}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a></p>
            <div className="mt-4 flex justify-between">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={() => updateInstructorStatus(selectedInstructor.id, "accepted")}>Accept</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => updateInstructorStatus(selectedInstructor.id, "rejected")}>Reject</button>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setSelectedInstructor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
