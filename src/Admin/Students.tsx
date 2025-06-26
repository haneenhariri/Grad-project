import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../Ui/Button/Button";
import axiosInstance from "../services/axiosInstance";
import Search from "../components/Search/Search";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import {  FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import user from "../assets-webp/Users (1).webp";
import { deleteTeacher } from "../services/teacherForm";
import StudentCourses from "./Users/StudentCourses";
import { useTranslation } from "react-i18next";



interface Student {
  id: number;
  name: string;
  email?: string;
  profile_picture?: string | null;
  courses?: Course[];
}
interface Course {
  title: {
    en: string;
    [key: string]: string;
  };
}
export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  // إغلاق النافذة المنبثقة عند الضغط على Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedStudent) {
        setSelectedStudent(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedStudent]);
    const handelDeleteUser = async (id: number) => {
      try {
        await deleteTeacher(id);
        setStudents((prev) => prev.filter((students) => students.id !== id));
        setOpenDropdown(null);
      } catch (error) {
        console.error(error);
      }
    }
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
   const columnHelper = createColumnHelper<Student>();
   const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: t('instructor.table.name'),
      cell: info => (
        <div className="font-medium text-gray-900">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('email', {
      header: t('instructor.table.email'),
      cell: info => (
        <div className="text-gray-700">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('profile_picture', {
      header: t('instructor.table.profilePicture'),
      cell: info => {
        const value = info.getValue();
        const ImageURL = value ? `http://127.0.0.1:8000/storage/${value}` : user;
        return (
          <img
            src={ImageURL}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: t('instructor.table.actions'),
      cell: props => {
        const studentId = props.row.original.id;
        const rowIndex = props.row.index;
        return (
          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === rowIndex ? null : rowIndex)}
              aria-label="Actions"
            >
              <FiMoreVertical size={18} />
            </button>
            {openDropdown === rowIndex && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden animate-fadeIn">
                <button 
                  className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSelectedStudent(props.row.original);
                    setOpenDropdown(null);
                  }}
                >
                  <FiEye size={16} className="mr-2 text-blue-500" />
                  <span>{t('instructor.table.viewCourses')}</span>
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors"
                  onClick={() => handelDeleteUser(studentId)}
                >
                  <FiTrash2 size={16} className="mr-2 text-red-500" />
                  <span>{t('instructor.table.deleteUser')}</span>
                </button>
              </div>
            )}
          </div>
        );
      },
    }),
  ], [openDropdown , columnHelper]);
  const table = useReactTable({
    data: students,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
          <Button 
            Bg="bg-btn hover:bg-violet-800 transition-colors" 
            text="Add Student" 
            textColor="text-white" 
            onClick={() => navigate('')} 
          />      
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {{
                              asc: (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 15l-6-6-6 6"/>
                                </svg>
                              ),
                              desc: (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 9l6 6 6-6"/>
                                </svg>
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                                <path d="M18 15l-6-6-6 6"/>
                                <path d="M6 9l6 6 6-6"/>
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length >0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td 
                        key={cell.id} 
                        className="px-6 py-4 text-sm border-b border-gray-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>)) ) : (
                    <tr>
                    <td 
                      colSpan={columns.length} 
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No user found

                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for student details */}
      {selectedStudent && (
        <StudentCourses modalRef={modalRef} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />
      )}
    </>
  );
}
