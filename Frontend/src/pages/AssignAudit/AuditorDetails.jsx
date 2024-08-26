import { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { auditorsColumns } from '../../constants/Column';
import Pop from '../../components/Pop';
import AuditorForm from './AuditorForm';
import GlobalFilter from '../../components/GlobalFilter';

const AuditorDetails = ({ auditors }) => {
  const columns = useMemo(() => auditorsColumns, []);
  const data = auditors || [];

  const [showPop, setShowPop] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState(null);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
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
    setGlobalFilter,
    prepareRow,
  } = tableInstance;
  const { globalFilter, pageIndex } = state;

  const handleAssignClick = (row) => {
    setSelectedAuditor(row.original);
    setShowPop(true);
  };

  return (
    <div className="bg-white pt-14 rounded-xl">
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white rounded-lg text-center">
          <thead className="bg-background">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-t border-border">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-sm font-extrabold text-primary text-center"
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
                      className="px-6 py-2 text-sm text-gray-900"
                    >
                      {cell.column.id === 'Assign' ? (
                        <button 
                          className='bg-primary text-xs md:text-sm text-white p-2 rounded-lg'
                          onClick={() => handleAssignClick(row)}
                        >
                          Assign
                        </button>
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
      </div>
      
      <div className="flex place-content-end gap-5 items-center p-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`${
            !canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
          } bg-primary text-white text-sm md:text-md font-bold py-2 px-4 rounded-lg`}
        >
          Previous
        </button>
        <span className='text-primary'>
          Page <b>{pageIndex + 1}</b> of <b>{pageOptions.length}</b>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`${
            !canNextPage ? 'opacity-50 cursor-not-allowed' : ''
          } bg-primary text-white text-sm md:text-md font-bold py-2 px-4 rounded-lg`}
        >
          Next
        </button>
      </div>
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <AuditorForm setShowPop={setShowPop} selectedAuditor={selectedAuditor} />
      </Pop>
    </div>
  );
};

export default AuditorDetails;
