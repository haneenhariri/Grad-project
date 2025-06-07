import React, { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import axiosInstance from '../../services/axiosInstance';

interface LogItem {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: number;
  causer_type: string;
  causer_id: number;
  created_at?: string;
  properties: {
    attributes: {
      title?: string;
      [key: string]: any;
    };
  };
}

export default function Log() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    axiosInstance
      .get('/activity-log')
      .then((res) => {
        setLogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching logs:', err);
        setLoading(false);
      });
  }, []);

  const columns = useMemo<ColumnDef<LogItem>[]>(
    () => [
      { header: 'ID', accessorKey: 'id' },
      { header: 'Description', accessorKey: 'description' },
      { header: 'Event', accessorKey: 'event' },
      {
        header: 'Subject Type',
        accessorFn: (row) => row.subject_type.split('\\').pop(),
      },
      { header: 'Subject ID', accessorKey: 'subject_id' },
      {
        header: 'Causer Type',
        accessorFn: (row) => row.causer_type.split('\\').pop(),
      },
      { header: 'Causer ID', accessorKey: 'causer_id' },
      {
        header: 'Course Title (ar)',
        accessorFn: (row) => {
          try {
            const parsed = JSON.parse(row.properties?.attributes?.title || '{}');
            return parsed.ar || '';
          } catch {
            return '';
          }
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: logs,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <p className="text-center">Loading logs...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 border">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
