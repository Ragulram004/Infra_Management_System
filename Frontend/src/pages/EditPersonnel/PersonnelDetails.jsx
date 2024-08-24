import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import { personnelColumns } from '../../constants/Column';

const PersonnelDetails = ({ personnels }) => {
  const columns = useMemo(() => personnelColumns, []);
  const data = personnels || []; // Ensure `data` is never undefined or null

  const handleClickAssignTask = (row) => {
    console.log("Assigning task for ID:", row.original._id); // Directly access _id from the original data
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, 
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = tableInstance;
  const { pageIndex } = state;

  return (
    <>
      <table {...getTableProps()} className="w-full bg-white rounded-lg overflow-y-scroll">
        <thead className="bg-background">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-t border-border">
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-sm font-extrabold text-primary tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => { 
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b border-b-border hover:bg-gray-50"
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {cell.column.id === 'Delete' ? (
                      <button onClick={() => handleClickAssignTask(row)}>Assign</button>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex place-content-end gap-5 items-center mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`${
            !canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
          } bg-primary text-white font-bold py-2 px-4 rounded`}
        >
          Previous
        </button>
        <span className='text-primary '>
          Page <b>{pageIndex + 1}</b> of <b>{pageOptions.length}</b>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`${
            !canNextPage ? 'opacity-50 cursor-not-allowed' : ''
          } bg-primary text-white font-bold py-2 px-4 rounded`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PersonnelDetails;
