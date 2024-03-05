
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel
} from '@tanstack/react-table';
import { useUsers } from './hooks/useUsers';
import { User } from './interfaces';
import { formatDate } from '../../helper/date-format';
import { useState } from 'react';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => 'Nombre'
  }),
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () =>'Correo'
  }),
  columnHelper.accessor('role', {
    id: 'role',
    header: () => 'rol',
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor('creationAt', {
    id: 'creationAt',
    header: () => 'Fecha de creación',
    cell: (info) => formatDate(info.getValue()!)
  }),
  columnHelper.accessor('updatedAt', {
    id: 'updatedAt',
    header: () => 'Fecha de actualización',
    cell: (info) =>  formatDate(info.getValue()!)
  }),
  columnHelper.accessor('avatar', {
    id: 'avatar',
    header: () => 'Avatar',
    cell: (info) => <img src={info.getValue()} alt='avatar' className='w-10 h-10 rounded-full' />
  })
];

export default function Users() {
  const { usersQuery } = useUsers();
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: usersQuery.data ?? [],
    columns,
    state: {
      sorting
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
      <div className='flex flex-col h-screen max-w-3xl mx-auto py-24'>
        {usersQuery.isLoading ? (
          <div>Cargando...</div>
        ) : (
          <div>
            <table className='border'>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className='border-b text-gray-800'>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className='px-4 pr-2 py-4 font-medium text-left'>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort() ? 'cursor-pointer select-none flex min-w-[36px]' : '',
                              onClick: header.column.getToggleSortingHandler()
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <span className='pl-2'>↑</span>,
                              desc: <span className='pl-2'>↓</span>
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className='border-b'>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='px-4 pt-[14px] pb-[18px]'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs'>
              <div className='sm:mr-auto sm:mb-0 mb-2'>
                <span className='mr-2'>Items por página</span>
                <select
                  className='border p-1 rounded w-16 border-gray-200'
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2'>
                <button
                  className={`${
                    !table.getCanPreviousPage() ? 'bg-gray-100' : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className='w-5 h-5'>{'<<'}</span>
                </button>
                <button
                  className={`${
                    !table.getCanPreviousPage() ? 'bg-gray-100' : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className='w-5 h-5'>{'<'}</span>
                </button>
                <span className='flex items-center gap-1'>
                  <input
                    min={1}
                    max={table.getPageCount()}
                    type='number'
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                    }}
                    className='border p-1 rounded w-10'
                  />
                  de {table.getPageCount()}
                </span>
                <button
                  className={`${
                    !table.getCanNextPage() ? 'bg-gray-100' : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className='w-5 h-5'>{'>'}</span>
                </button>
                <button
                  className={`${
                    !table.getCanNextPage() ? 'bg-gray-100' : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className='w-5 h-5'>{'>>'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
