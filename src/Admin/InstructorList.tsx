import { useEffect, useMemo, useRef, useState } from "react";
import { allRequest, allTeacher, deleteTeacher } from "../services/teacherForm";
import axios from "axios";
import { getSecureCookie } from "../utils/cookiesHelper";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Search from "../components/Search/Search";
import Button from "../Ui/Button/Button";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handelDeleteUser = async (id :number) => {
    try{
      await deleteTeacher(id);
      setInstructors((prev) => prev.filter((instructor) => instructor.id !== id));
      setOpenDropdown(null);
    }catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const [requestRes, teacherRes] = await Promise.all([allRequest(), allTeacher()]);
        const formatData = (data: Instructor[]): Instructor[] =>
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
  const columnHelper = createColumnHelper<Instructor>();
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <div className="font-medium text-gray-900">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => (
        <div className="text-gray-700">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('education', {
      header: 'Education',
      cell: info => (
        <div className="text-gray-700">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('specialization', {
      header: 'Specialization',
      cell: info => (
        <div className="text-gray-700">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            info.getValue() === "accepted"
              ? "text-green-700 bg-green-100"
              : info.getValue() === "pending"
              ? "text-yellow-700 bg-yellow-100"
              : "text-red-700 bg-red-100"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: props => {
        const instructorId = props.row.original.id;
        const rowIndex = props.row.index;
        return (
          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setOpenDropdown(openDropdown === rowIndex ? null : rowIndex)}
              aria-label="Actions"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16v6" />
                <path d="M12 2v6" />
                <path d="M16.24 7.76l-1.41 1.41" />
                <path d="M7.76 7.76l1.41 1.41" />
              </svg>
            </button>
            {openDropdown === rowIndex && (
              <div className="absolute z-10 right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setSelectedInstructor(props.row.original)}>
                  View
                </button>
                <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" onClick={() => handelDeleteUser(instructorId)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    })
  ], [openDropdown]);
  const table = useReactTable({
    data: instructors,
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

  })
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
  return (
    <>
      <div className=" flex justify-between items-center mb-6">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
        <Button text="Add Instructor" Bg="bg-btn" textColor="text-white"/>
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
              {table.getCoreRowModel().rows.length > 0 ? (
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
                  </tr>
                ))
              ):
              (
                <tr>
                  <td colSpan={columns.length}
                      className="px-6 py-10 text-center text-gray-500">
                      No Instructor found
                  </td>
                </tr>
              )}
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
