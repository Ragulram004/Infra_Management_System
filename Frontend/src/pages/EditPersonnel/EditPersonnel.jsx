import React, { Fragment, useEffect, useState } from 'react';
import Pop from '../../components/Pop';
import PersonnelForm from './PersonnelForm';
import PersonnelDetails from './PersonnelDetails';
import { usePersonnelsContext } from '../../hooks/usePersonnelContext';

const EditPersonnel = () => {
  const { personnels, dispatch } = usePersonnelsContext();
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    const fetchPersonnels = async () => {
      try {
        const response = await fetch('http://localhost:4500/api/personnel');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_PERSONNELS', payload: json });
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchPersonnels();
  }, [dispatch]); 

  return (
    <Fragment>
      <div>
        <button 
          className='bg-primary w-12 h-12 rounded-full text-white font-extrabold' 
          title='Add Personnel text-2xl' 
          onClick={() => setShowPop(true)}
        >
          +
        </button>
      </div> 
      <PersonnelDetails personnels={personnels || []} /> {/* Pass an empty array if `personnels` is null */}
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <PersonnelForm setShowPop={setShowPop} />
      </Pop>
    </Fragment>
  );
};

export default EditPersonnel;
