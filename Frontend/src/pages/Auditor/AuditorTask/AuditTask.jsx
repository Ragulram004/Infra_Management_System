import React, { useEffect } from 'react';
import AuditTaskDetails from './AuditTaskDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { usePersonnelsContext } from '../../../hooks/usePersonnelContext';

const AuditTask = () => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK;

  const { user } = useAuthContext();
  const { personnels, dispatch } = usePersonnelsContext();

  useEffect(() => {
    const fetchAuditTasks = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          const filteredTasks = json.filter(task => task.email === user.email);
          dispatch({ type: 'SET_PERSONNELS', payload: filteredTasks });
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    if (user) fetchAuditTasks();
  }, [dispatch, user, personnels]);

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Report Audit Tasks</h1>
      </div>
      <AuditTaskDetails personnels={personnels} API={API} />
    </div>
  );
};

export default AuditTask;
