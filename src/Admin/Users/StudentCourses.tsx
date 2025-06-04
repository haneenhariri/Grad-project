import { MutableRefObject } from "react";
interface Student {
  id: number;
  name: string;
  courses?: Course[];
}
interface Course {
  title: {
    en: string;
    [key: string]: string;
  };
}
interface StudentCoursesProps {
  modalRef: MutableRefObject<HTMLDivElement | null>;
  selectedStudent: Student;
  setSelectedStudent: (value: Student | null) => void;
}
export default function StudentCourses({modalRef , selectedStudent ,setSelectedStudent} : StudentCoursesProps) {
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-primary">Student Details</h2>
            {selectedStudent.courses?.map((e,i)=>
             (<p key={i}>{i + 1 } - {e.title.en}</p>)
            )}
          <div className="grid grid-cols-3 gap-3 mt-6">
              <button 
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
  )
}
