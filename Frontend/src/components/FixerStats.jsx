import { useState, useEffect, useMemo } from 'react';
import { fixerStats } from '../constants/Column'; 
import { useAuthContext } from '../hooks/useAuthContext';
import { useTable, useGlobalFilter } from 'react-table';
import StatsFilter from './Statsfilter';

const FixerStats = () => {
  const API = import.meta.env.VITE_INFRA_API_FIXERSTATS;
  const { user } = useAuthContext();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchAuditorStats = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setStats(json);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      }
    };
    if (user) fetchAuditorStats();
  }, [user, API]);

  const columns = useMemo(() => fixerStats, []);
  const data = useMemo(() => stats, [stats]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    setGlobalFilter,
    prepareRow
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <div className="bg-white relative pt-10 rounded-xl mt-2 w-full">
      <StatsFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white rounded-lg text-left">
          <thead className="bg-gray-100">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-sm font-bold text-gray-700 text-left"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100`}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-2 text-sm text-gray-700"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixerStats;

