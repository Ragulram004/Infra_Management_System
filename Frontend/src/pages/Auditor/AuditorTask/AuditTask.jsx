import React, { useEffect, useState } from 'react';
import AuditTaskDetails from './AuditTaskDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';
import io from 'socket.io-client'

const AuditTask = () => {
  const API = import.meta.env.VITE_INFRA_API_SORTAUDIT;

  const { user } = useAuthContext();
  const [socket,setSocket] = useState(null);
  const [tasks,setTasks] = useState([])

  useEffect(() => {
    const fetchAuditTasks = async () => {
      try {
        const response = await fetch(API, {
          method: 'POST',
          body: JSON.stringify({ email: user.email,role: user.role }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          setTasks(json)
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    if (user) {
      fetchAuditTasks();
      
      const newSocket = io('http://localhost:4500')
      setSocket(newSocket)

      newSocket.on('createdAudit', (createdAudit) => {
        if(user.email === createdAudit.userId.email){
          setTasks((prevAudit) => [...prevAudit, createdAudit]);
        }
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
    }
  }, [user]);

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Report Audit Tasks</h1>
      </div>
      <AuditTaskDetails tasks={tasks}  />
    </div>
  );
};

export default AuditTask;
