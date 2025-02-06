import { useState } from "react";
import Button from "../Ui/Button/Button";
import img from '../assets/Search (1).png'
interface Instructor {
  name: string;
  email: string;
  profile: string;
  qualifications: string;
  status: "Approved" | "Pending";
}

const instructorsData: Instructor[] = [
  { name: "Alex Ashley", email: "alex@example.com", profile: "Profile Link", qualifications: "PhD in Computer Science", status: "Approved" },
  { name: "Michael Wood", email: "michael@example.com", profile: "Profile Link", qualifications: "Master in AI", status: "Pending" },
  { name: "Emily Smith", email: "emily@example.com", profile: "Profile Link", qualifications: "BSc in Software Engineering", status: "Approved" },
  { name: "Alex Ashley", email: "alex@example.com", profile: "Profile Link", qualifications: "PhD in Computer Science", status: "Approved" },
  { name: "Michael Wood", email: "michael@example.com", profile: "Profile Link", qualifications: "Master in AI", status: "Pending" },
  { name: "Emily Smith", email: "emily@example.com", profile: "Profile Link", qualifications: "BSc in Software Engineering", status: "Approved" },
  { name: "Alex Ashley", email: "alex@example.com", profile: "Profile Link", qualifications: "PhD in Computer Science", status: "Approved" },
  { name: "Michael Wood", email: "michael@example.com", profile: "Profile Link", qualifications: "Master in AI", status: "Pending" },
  { name: "Emily Smith", email: "emily@example.com", profile: "Profile Link", qualifications: "BSc in Software Engineering", status: "Approved" },
  { name: "Alex Ashley", email: "alex@example.com", profile: "Profile Link", qualifications: "PhD in Computer Science", status: "Approved" },
  { name: "Michael Wood", email: "michael@example.com", profile: "Profile Link", qualifications: "Master in AI", status: "Pending" },
  { name: "Emily Smith", email: "emily@example.com", profile: "Profile Link", qualifications: "BSc in Software Engineering", status: "Approved" },
];
export default function InstructorList() {
    const [instructors, setInstructors] = useState<Instructor[]>(instructorsData);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  
    const updateInstructorStatus = (index: number, status: "Approved" | "Pending") => {
      const updatedInstructors = instructors.map((instructor, i) =>
        i === index ? { ...instructor, status } : instructor
      );
      setInstructors(updatedInstructors);
    };
  return (
    <>
        <div className=" flex gap-4 justify-end mb-4">
            <img src={img} alt="" className=" border-2 border-violet-950" />
        <Button Bg="bg-btn" text="Add Instructor" textColor="text-white"/>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="overflow-x-auto">
      <table className="w-full ">
        <thead>
          <tr className=" text-left">
            <th className="p-3 text-gray-600 border-b border-gray-200">Name</th>
            <th className="p-3  text-gray-600 border-b border-b-gray-200">Email</th>
            <th className="p-3  text-gray-600 border-b border-b-gray-200">Profile</th>
            <th className="p-3 text-gray-600 border-b border-b-gray-200">Qualifications</th>
            <th className="p-3 text-gray-600 border-b border-b-gray-200">Status</th>
            <th className="p-3 text-gray-600 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 border-b border-gray-200">{instructor.name}</td>
              <td className="p-3 border-b text-sm border-gray-200">{instructor.email}</td>
              <td className="p-3 border-b text-sm border-gray-200"><a href="#" className="text-blue-600">View</a></td>
              <td className="p-3 border-b text-sm border-gray-200">{instructor.qualifications}</td>
              <td className={`p-3 border-b text-sm border-gray-200 font-semibold`}> <span className={` ${instructor.status === "Approved" ? "text-green-600 bg-green-100 px-2 py-1 rounded-md" : "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md"}`}>{instructor.status}</span> </td>
              <td className="p-3 border-b text-sm border-gray-200 text-center relative">
                <button className="text-gray-500 text-sm hover:text-gray-700" onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
                  &#8226;&#8226;&#8226;
                </button>
                {openDropdown === index && (
                  <div className="absolute z-10 right-0 mt-2 w-44 bg-white border-b border-gray-200 shadow-lg rounded-md">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</button>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button>
                    <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100" onClick={() => updateInstructorStatus(index, "Approved")}>
                       verifying documents
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100" onClick={() => updateInstructorStatus(index, "Pending")}>
                         Payment
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
