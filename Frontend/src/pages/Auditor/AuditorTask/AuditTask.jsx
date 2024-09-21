import React, { useEffect, useState } from 'react';
import AuditTaskDetails from './AuditTaskDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';
import io from 'socket.io-client'

const AuditTask = () => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK;

  const { user } = useAuthContext();
  const [socket,setSocket] = useState(null);
  const [tasks,setTasks] = useState([])

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
          setTasks(filteredTasks)
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    if (user) fetchAuditTasks();

    const newSocket = io('http://localhost:4500')
    setSocket(newSocket)

    newSocket.on('createdAudit', (createdAudit) => {
      setTasks((prevAudit) => [createdAudit, ...prevAudit]);
    });

    newSocket.on('updatedAudit', (updatedAudit) => {
      setTasks((prevAudit) =>
        prevAudit.map((audit) =>
          audit._id === updatedAudit._id ? updatedAudit : audit
        )
      );
    });
    
    return () => {
      newSocket.disconnect();
    };
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
