import { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  SortingState,
  createColumnHelper,
  getSortedRowModel,
} from '@tanstack/react-table';
import axiosInstance from '../../services/axiosInstance';
import Spinner from '../../components/Spinner/Spinner';
import Search from '../../components/Search/Search';
import { useTranslation } from 'react-i18next';

interface PropertyChanges {
  attributes?: Record<string, any>;
  old?: Record<string, any>;
}

interface LogItem {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: number;
  causer_type: string;
  causer_id: number;
  causer: {
    name: string;
    email?: string;
    profile_picture?: string;
  };
  properties: PropertyChanges;
  created_at: string;
  updated_at: string;
  subject?: any;
  batch_uuid?: string | null;
}

export default function Log() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleRowClick = (log: LogItem) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

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

  const columnHelper = createColumnHelper<LogItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('dashboard.log.id'),
        cell: info => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('created_at', {
        header: t('dashboard.log.date'),
        cell: info => {
          const rawDate = info.getValue();
          const formatted = rawDate
            ? new Date(rawDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '—';

          return (
            <div className="text-sm text-gray-800">
              {formatted}
            </div>
          );
        },
      }),
      columnHelper.accessor('description', {
        header: t('dashboard.log.action'),
        cell: info => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('event', {
        header: t('dashboard.log.event'),
        cell: info => {
          const event = info.getValue();
          let color = '';

          switch (event) {
            case 'created':
              color = 'bg-green-100 text-green-800';
              break;
            case 'updated':
              color = 'bg-blue-100 text-blue-800';
              break;
            case 'deleted':
              color = 'bg-red-100 text-red-800';
              break;
            default:
              color = 'bg-gray-100 text-gray-800';
              break;
          }

          return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                {t(`dashboard.log.eventType.${event}`, { defaultValue: t('dashboard.log.eventType.default') })}
            </span>
          );
        },
      }),
      columnHelper.accessor('causer.name', {
        header: t('dashboard.log.causer'),
        cell: info => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('subject_type', {
        header: t('dashboard.log.subjectType'),
        cell: info => (
          <div className="font-medium text-gray-900">
            {info.getValue().split('\\').pop()}
          </div>
        ),
      }),
      columnHelper.accessor('subject_id', {
        header: t('dashboard.log.subjectId'),
        cell: info => (
          <div className="font-medium text-gray-900">{info.getValue()}</div>
        ),
      }),
    ],
    [t]
  );

  const table = useReactTable({
    data: logs,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) return <p className="text-center"><Spinner/></p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
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
                  <tr 
                    key={row.id} 
                    onClick={() => handleRowClick(row.original)}  
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
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
                  <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500">
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center  w-full sm:w-auto justify-center space-x-2 mb-4 sm:mb-0">
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
              {t("instructor.table.Page")} <strong>{table.getState().pagination.pageIndex + 1}</strong> {t("instructor.table.of")}{' '}
              <p>{table.getPageCount()}</p>
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t("instructor.table.Rows per page")}:</span>
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

      {/* Modal for detailed log view */}
      {isModalOpen && selectedLog && (
<div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-8 relative max-h-[90vh] overflow-y-auto"
  >
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
      aria-label="Close"
    >
      ✖
    </button>

    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      📝 Log Details
    </h2>

    {/* التفاصيل العامة */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
        <p><span className="font-semibold text-gray-700">ID:</span> {selectedLog.id}</p>
        <p><span className="font-semibold text-gray-700">Log Name:</span> {selectedLog.log_name}</p>
        <p><span className="font-semibold text-gray-700">Description:</span> {selectedLog.description}</p>
        <p>
          <span className="font-semibold text-gray-700">Event:</span>
          <span className={`ml-2 px-2 py-1 text-xs font-bold rounded-full ${
            selectedLog.event === 'created' ? 'bg-green-100 text-green-700' :
            selectedLog.event === 'updated' ? 'bg-blue-100 text-blue-700' :
            selectedLog.event === 'deleted' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {selectedLog.event}
          </span>
        </p>
        <p><span className="font-semibold text-gray-700">Subject Type:</span> {selectedLog.subject_type.split('\\').pop()}</p>
        <p><span className="font-semibold text-gray-700">Subject ID:</span> {selectedLog.subject_id}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-3">
        <p><span className="font-semibold text-gray-700">Causer:</span> {selectedLog.causer?.name}</p>
        {selectedLog.causer?.email && (
          <p><span className="font-semibold text-gray-700">Causer Email:</span> {selectedLog.causer.email}</p>
        )}
        <p><span className="font-semibold text-gray-700">Created At:</span> {new Date(selectedLog.created_at).toLocaleString()}</p>
        <p><span className="font-semibold text-gray-700">Updated At:</span> {new Date(selectedLog.updated_at).toLocaleString()}</p>
        {selectedLog.batch_uuid && (
          <p><span className="font-semibold text-gray-700">Batch UUID:</span> {selectedLog.batch_uuid}</p>
        )}
      </div>
    </div>

    {/* التغييرات في حالة التحديث */}
    {selectedLog.event === 'updated' && selectedLog.properties?.attributes && selectedLog.properties?.old && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          🛠️ Changes
        </h3>
        <div className="space-y-4">
          {Object.keys({ ...selectedLog.properties.attributes, ...selectedLog.properties.old }).map((key) => {
            if (['created_at', 'updated_at'].includes(key)) return null;

            const oldValue = selectedLog.properties.old[key];
            const newValue = selectedLog.properties.attributes[key];

            if (JSON.stringify(oldValue) === JSON.stringify(newValue)) return null;

            return (
              <div
                key={key}
                className="border rounded-lg p-2 bg-gray-50 shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-indigo-600">{key}</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Old Value:</p>
                    <div className="bg-white border rounded p-2 text-sm text-gray-800 whitespace-pre-wrap max-h-60 overflow-auto">
                      {typeof oldValue === 'object' ? (
                        <pre className="text-xs">{JSON.stringify(oldValue, null, 2)}</pre>
                      ) : (
                        String(oldValue)
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">New Value:</p>
                    <div className="bg-white border rounded p-2 text-sm text-gray-800 whitespace-pre-wrap max-h-60 overflow-auto">
                      {typeof newValue === 'object' ? (
                        <pre className="text-xs">{JSON.stringify(newValue, null, 2)}</pre>
                      ) : (
                        String(newValue)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    )}

    {/* تفاصيل العنصر المنشأ */}
    {selectedLog.event === 'created' && selectedLog.properties?.attributes && (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">🆕 Created Item Details</h3>
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.entries(selectedLog.properties.attributes).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-4 py-2 font-medium text-gray-800">{key}</td>
                  <td className="px-4 py-2 text-gray-500 whitespace-pre-wrap">{typeof value === 'object' ? <pre>{JSON.stringify(value, null, 2)}</pre> : String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* تفاصيل العنصر المحذوف */}
    {selectedLog.event === 'deleted' && selectedLog.properties?.old && (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">🗑️ Deleted Item Details</h3>
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.entries(selectedLog.properties.old).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-4 py-2 font-medium text-gray-800">{key}</td>
                  <td className="px-4 py-2 text-gray-500 whitespace-pre-wrap">{typeof value === 'object' ? <pre>{JSON.stringify(value, null, 2)}</pre> : String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

      )}
    </>
  );
}