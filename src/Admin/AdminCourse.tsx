import { useEffect, useState, useMemo, useRef } from "react";
import Button from "../Ui/Button/Button";
import {  allCourses, changeStatusCourse, deleteCourse, pendingCourse } from "../services/courses";
import { useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { FiEdit2, FiTrash2, FiCheck, FiX, FiMoreVertical } from 'react-icons/fi';
import Search from "../components/Search/Search";

interface Course {
  id: number;
  instructor: string;
  status: "accepted" | "pending" | "rejected";
  rating: string | null;
  description: string;
  price: string;
  title: string;
  duration: string;
  level: string;
}


export default function AdminCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const navigate = useNavigate();
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

  const updateCourseStatus = async (id: number, status: "accepted" | "rejected") => {
    try {
      await changeStatusCourse({ id, status });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, status } : course
        )
      );
      setOpenDropdown(null);
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      await deleteCourse(id);
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      setOpenDropdown(null);
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

        const formattedData: Course[] = [...allCoursesResponse, ...pendingCoursesResponse].map((item: Course) => ({
          id: item.id,
          instructor: item.instructor,
          status: item.status,
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



    fetchCourses();
  }, []);

  // تعريف أعمدة الجدول باستخدام columnHelper
  const columnHelper = createColumnHelper<Course>();
  
  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Course Name',
      cell: info => (
        <div className="font-medium text-gray-900">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('instructor', {
      header: 'Instructor',
      cell: info => (
        <div className="text-gray-700">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('duration', {
      header: 'Duration',
      cell: info => (
        <div className="text-gray-700">{`${info.getValue()} weeks`}</div>
      ),
    }),
    columnHelper.accessor('level', {
      header: 'Level',
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
    columnHelper.accessor('price', {
      header: 'Price',
      cell: info => (
        <div className="font-medium text-gray-900">{`$${info.getValue()}`}</div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: props => {
        const courseId = props.row.original.id;
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
                  onClick={() => navigate(`/Admin/Edit/${courseId}`)}
                >
                  <FiEdit2 size={16} className="mr-2 text-blue-500" />
                  <span>Edit Course</span>
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors"
                  onClick={() => handleDeleteCourse(courseId)}
                >
                  <FiTrash2 size={16} className="mr-2 text-red-500" />
                  <span>Delete Course</span>
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-green-600 hover:bg-gray-50 transition-colors"
                  onClick={() => updateCourseStatus(courseId, "accepted")}
                >
                  <FiCheck size={16} className="mr-2 text-green-500" />
                  <span>Approve Course</span>
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-3 text-yellow-600 hover:bg-gray-50 transition-colors"
                  onClick={() => updateCourseStatus(courseId, "rejected")}
                >
                  <FiX size={16} className="mr-2 text-yellow-500" />
                  <span>Reject Course</span>
                </button>
              </div>
            )}
          </div>
        );
      },
    }),
  ], [ openDropdown, navigate]);

  // إنشاء جدول باستخدام useReactTable
  const table = useReactTable({
    data: courses,
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
          <Button 
            Bg="bg-btn hover:bg-violet-800 transition-colors" 
            text="Add Course" 
            textColor="text-white" 
            onClick={() => navigate('/Admin/Create')} 
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
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
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
                ) : (
                  <tr>
                    <td 
                      colSpan={columns.length} 
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </button>
              <button
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <button
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center gap-1">
                Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
                <strong>{table.getPageCount()}</strong>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="p-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                {[10, 20, 30, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
