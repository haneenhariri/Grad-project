import { useEffect, useMemo, useState } from "react";
import Button from "../Ui/Button/Button";
import axiosInstance from "../services/axiosInstance";
import Search from "../components/Search/Search";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";



interface Student {
  id: number;
  name: string;
  email: string;
  profile_picture?: string | null;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

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

  ], []);
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
      <div className="flex gap-4   justify-end mb-4">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
        <Button  Bg="bg-btn text-white" text="Add Student"/>
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
    </>
  );
}
