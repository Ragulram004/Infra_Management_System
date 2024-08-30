import React, { useEffect, useState } from 'react';

import AssignedAuditDetails from './AssignedAuditDetails';
import { usePersonnelsContext } from '../../hooks/usePersonnelContext';

const AssignedAudits = () => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK

  const { personnels, dispatch } = usePersonnelsContext();

  useEffect(() => {
    const fetchAssignedAudits = async () => {
      try {
        const response = await fetch(API);
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_PERSONNELS', payload: json });
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchAssignedAudits();
  }, [dispatch]); 

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Edit Assigned Audits</h1>
      </div>
      <AssignedAuditDetails personnels={personnels || []} API={API} /> 
    </div>
  );
};

export default AssignedAudits;
