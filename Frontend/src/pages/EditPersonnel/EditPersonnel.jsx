import React, { Fragment, useEffect, useState } from 'react';
import { useTable } from 'react-table';
import Pop from '../../components/Pop'
import PersonnelForm from './PersonnelForm';

const EditPersonnel = () => {
  const [personnels, setPersonnels] = useState([]);
  const[showPop, setShowPop] = useState(false);

  useEffect(() => {
    const fetchPersonnels = async () => {
      const response = await fetch('http://localhost:4500/api/personnel');
      try {
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          setPersonnels(json);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchPersonnels();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: personnels,
  });

  return (
    <Fragment>
      <div>
        <button className='bg-primary w-12 h-12 rounded-full text-white font-extrabold' title='Add Personnel text-2xl' onClick={() => setShowPop(true)}>+</button>
      </div> 
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <PersonnelForm/>
      </Pop>
      
    </Fragment>
  );
};

export default EditPersonnel;