import { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { assignedfixesColumns } from '../../../constants/Column';
import Pop from '../../../components/Pop';
import EmptyAlert from '../../../components/EmptyAlert';
import GlobalFilter from '../../../components/GlobalFilter';

const AssignedFixersDetails = ({ fixerTasks, API }) => {
  const columns = useMemo(() => assignedfixesColumns, []);
  const data = fixerTasks || []; // Ensure `data` is never undefined or null

  const [showPop, setShowPop] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Image state

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

  // Image click handler
  const handleImageClick = (imagePath) => {
    console.log("Image clicked:", imagePath); // Debug log
    if (imagePath) {
      setSelectedImage(imagePath); // Set the selected image
    } else {
      console.error("No image path provided"); // Debug error if no path
    }
  };

  const handleCloseImage = () => {
    setSelectedImage(null); // Reset the selected image on close
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
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b border-b-border hover:bg-gray-50 font-[600]`}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-2 text-sm text-gray-900"
                    >
                      {/* Check if the column is the 'Image' column */}
                      {cell.column.id === 'imagepath' && cell.value ? (
                          <img
                            src={`http://localhost:4500${cell.value}`} // Ensure the full image URL
                            alt="Task Image"
                            className="w-14 h-14 rounded-md object-cover cursor-pointer mx-auto" // Add object-cover for consistent scaling
                            onClick={() => handleImageClick(`http://localhost:4500${cell.value}`)} // Pass the full URL to handleImageClick
                          />
                        ) : cell.column.id === 'Delete' ? (
                        row.original.status === 'completed' ? (
                          <button
                            className="bg-success bg-opacity-65 text-xs md:text-sm text-white p-2 rounded-lg font-extrabold cursor-not-allowed"
                            disabled
                          >
                            Resolved
                          </button>
                        ) : row.original.status === 'pending' ? (
                          <button 
                            className='bg-error text-xs md:text-sm text-white p-2 rounded-lg font-extrabold'
                            onClick={() => { setShowPop(true); setRowId(row); }}
                          >
                            Delete
                          </button>
                        ) : null
                      ) : (
                        <div className='py-2'>
                          {cell.render('Cell')}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Pop-up for Delete Alert */}
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <EmptyAlert rowId={rowId} setShowPop={setShowPop} API={API} />
      </Pop>

      {/* Full-screen image pop-up */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-65 backdrop-blur-[2px] flex items-center justify-center z-50' onClick={handleCloseImage}>
          <img src={selectedImage} alt='Full Screen' className='max-w-full max-h-full' />
          <button className='absolute top-4 right-4 text-white text-2xl' onClick={handleCloseImage}>×</button>
        </div>
      )}
    </div>
  );
};

export default AssignedFixersDetails;


