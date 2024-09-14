import React, { useEffect, useState } from 'react';
import AuditTaskDetails from './AuditTaskDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';

const AuditTask = () => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK; // Adjust this to your actual API endpoint

  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);

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
          setTasks(json);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    if (user) fetchAuditTasks();
  }, [user]);

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Report Audit Tasks</h1>
      </div>
      <AuditTaskDetails tasks={tasks} API={API} />
    </div>
  );
};

export default AuditTask;
