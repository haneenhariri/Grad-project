import { useEffect, useMemo, useRef, useState } from "react";
import { allRequest, allTeacher, deleteTeacher } from "../services/teacherForm";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Search from "../components/Search/Search";
import { FiMoreVertical, FiEye, FiTrash2 } from "react-icons/fi";
import axiosInstance from "../services/axiosInstance";
import { useTranslation } from "react-i18next";

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
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  // إغلاق النافذة المنبثقة عند الضغط على Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedInstructor) {
        setSelectedInstructor(null);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [selectedInstructor]);

  const handelDeleteUser = async (id: number) => {
    try {
      await deleteTeacher(id);
      setInstructors((prev) =>
        prev.filter((instructor) => instructor.id !== id)
      );
      setOpenDropdown(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const [requestRes, teacherRes] = await Promise.all([
          allRequest(),
          allTeacher(),
        ]);
        const formatData = (data: Instructor[]): Instructor[] =>
          data.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            education: item.education,
            specialization: item.specialization,
            summery: item.summery,
            cv: item.cv,
            status:
              item.status === "pending"
                ? "pending"
                : item.status === "rejected"
                ? "rejected"
                : "accepted",
          }));

        const mergedData = [
          ...formatData(requestRes.data),
          ...formatData(teacherRes.data),
        ];

        setInstructors(mergedData);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const columnHelper = createColumnHelper<Instructor>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("instructor.table.name"),
        cell: (info) => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("email", {
        header: t("instructor.table.email"),
        cell: (info) => <div className="text-gray-700">{info.getValue()}</div>,
      }),
      columnHelper.accessor("education", {
        header: t("instructor.table.education"),
        cell: (info) => <div className="text-gray-700">{info.getValue()}</div>,
      }),
      columnHelper.accessor("specialization", {
        header: t("instructor.table.specialization"),
        cell: (info) => <div className="text-gray-700">{info.getValue()}</div>,
      }),
      columnHelper.accessor("status", {
        header: t("instructor.table.status"),
        cell: (info) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              info.getValue() === "accepted"
                ? "text-green-700 bg-green-100"
                : info.getValue() === "pending"
                ? "text-yellow-700 bg-yellow-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {t(`dashboard.${info.getValue()}`)}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: t("instructor.table.actions"),
        cell: (props) => {
          const instructorId = props.row.original.id;
          const rowIndex = props.row.index;
          return (
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() =>
                  setOpenDropdown(openDropdown === rowIndex ? null : rowIndex)
                }
                aria-label="Actions"
              >
                <FiMoreVertical size={18} />
              </button>
              {openDropdown === rowIndex && (
                <div className="absolute z-10 right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md">
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedInstructor(props.row.original);
                      setOpenDropdown(null);
                    }}
                  >
                    <FiEye size={16} className="mr-2 text-blue-500" />
                    <span>{t("instructor.table.view")}</span>
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={() => handelDeleteUser(instructorId)}
                  >
                    <FiTrash2 size={16} className="mr-2" />
                    <span>{t("instructor.table.delete")}</span>
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
    ],
    [openDropdown]
  );

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
  });

  const updateInstructorStatus = async (
    id: number,
    status: "accepted" | "rejected"
  ) => {
    try {
      await axiosInstance.post(
        `http://127.0.0.1:8000/api/requests/${id}/change-status`,
        { status }
      );

      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.id === id ? { ...instructor, status } : instructor
        )
      );

      setSelectedInstructor(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // منع التمرير عندما تكون النافذة المنبثقة مفتوحة
  useEffect(() => {
    if (selectedInstructor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedInstructor]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map((header) => (
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
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 15l-6-6-6 6" />
                                </svg>
                              ),
                              desc: (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-30"
                              >
                                <path d="M18 15l-6-6-6 6" />
                                <path d="M6 9l6 6 6-6" />
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
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
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
                    {t("dashboard.No Instructor found")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for instructor details */}
      {selectedInstructor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-10 rounded-lg shadow-lg max-w-[90%] max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-6 text-primary">
              {t("instructor.instructorDetails")}
            </h2>

            <div className="space-y-3 mb-6">
              <p className="flex gap-6 mb-2.5">
                <strong className="text-btn">{t("instructor.name")}:</strong>
                <span className="text-gray-900">{selectedInstructor.name}</span>
              </p>
              <p className="flex gap-6 mb-2.5">
                <strong className="text-btn">{t("instructor.email")}:</strong>
                <span className="text-gray-900">
                  {selectedInstructor.email}
                </span>
              </p>
              <p className="flex gap-6 mb-2.5">
                <strong className="text-btn">{t("instructor.education")}:</strong>
                <span className="text-gray-900">
                  {selectedInstructor.education}
                </span>
              </p>
              <p className="flex gap-6 mb-2.5">
                <strong className="text-btn">{t("instructor.specialization")}:</strong>
                <span className="text-gray-900">
                  {selectedInstructor.specialization}
                </span>
              </p>

              <div>
                <strong className="text-btn">{t("instructor.summary")}:</strong>
                <p className="mt-1 text-gray-900 bg-gray-200 p-3 rounded-md text-sm">
                  {selectedInstructor.summery}
                </p>
              </div>

              <p>
                <strong className="text-btn">{t("instructor.cv")}:</strong>
                <a
                  href={`http://127.0.0.1:8000/storage/${selectedInstructor.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >{" "}
                  {t("instructor.viewCV")}
                </a>
              </p>

              <p className="flex gap-6">
                <strong className="text-btn">{t("instructor.status")}:</strong>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedInstructor.status === "accepted"
                      ? "text-green-700 bg-green-100"
                      : selectedInstructor.status === "pending"
                      ? "text-yellow-700 bg-yellow-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {t(`instructor.${selectedInstructor.status}`)}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <button
                className="px-4 py-2 border text-green-600 border-green-600 rounded-md hover:text-white hover:bg-green-700 transition-colors"
                onClick={() =>
                  updateInstructorStatus(selectedInstructor.id, "accepted")
                }
              >
                {t("instructor.accept")}
              </button>
              <button
                className="px-4 py-2 border text-red-600 border-red-600 rounded-md hover:text-white hover:bg-red-700 transition-colors"
                onClick={() =>
                  updateInstructorStatus(selectedInstructor.id, "rejected")
                }
              >
                {t("instructor.reject")}
              </button>
              <button
                className="px-4 py-2 border text-gray-400 border-gray-400 hover:text-white rounded-md hover:bg-gray-500 transition-colors"
                onClick={() => setSelectedInstructor(null)}
              >
                {t("instructor.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
