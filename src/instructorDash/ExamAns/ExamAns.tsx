import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
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
import Search from "../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import Button from "../../Ui/Button/Button";
import { useTranslation } from "react-i18next";
interface Course {
  id: number;
  title: string;
  students_answered_count: number;
}
export default function ExamAns() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseAns = async () => {
      try {
        const response = await axiosInstance.get(`/instructor/courses`);
        if (response.data && response.data.data) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourseAns();
  }, []);
  const columnHelper = createColumnHelper<Course>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("instructor.table.id"),
        cell: (info) => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("title", {
        header: t("instructor.table.title"),
        cell: (info) => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("students_answered_count", {
        header: t("instructor.table.students_answered_count"),
        cell: (info) => <div className="text-gray-700">{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: "actions",
        header: t("instructor.table.actions"),
        cell: (props) => {
          const courseId = props.row.original.id;
          return (
            <div className="text-gray-700">
              <Button
                text="Show Students"
                onClick={() => navigate(`/instruct/courseAnswers/${courseId}`)}
                Bg="text-white bg-btn"
              />
            </div>
          );
        },
      }),
    ],
    [t]
  );

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
    <section>
      <div className="flex justify-between mb-6">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-1 py-1 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer"
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
            </tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
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
                  No Answers found
                </td>
              </tr>
            )}
          </table>
        </div>
        {/* pagination */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center w-full sm:w-auto justify-center space-x-2 mb-4 sm:mb-0">
            <button
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            </button>
            <button
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <button
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="flex items-center gap-1">
              {t("instructor.table.Page")} <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
              {t("instructor.table.of")} <strong>{table.getPageCount()}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t("instructor.table.Rows per page")}:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
