import React, { useEffect, useState } from 'react';
import AssignedAuditDetails from './AssignedAuditDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';
import io from 'socket.io-client';

const AssignedAudits = () => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK;
  const [socket, setSocket] = useState(null);
  const [auditTasks, setAuditTasks] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAssignedAudits = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          setAuditTasks(json);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    if (user) {
      fetchAssignedAudits();

      const newSocket = io('https://infra-management-system-server.vercel.app'); // Use environment variable for Socket.IO server URL
      setSocket(newSocket);

      newSocket.on('createdAudit', (newAudit) => {
        setAuditTasks((prevAudit) => [newAudit, ...prevAudit]);
      });

      newSocket.on('deletedAudit', (deletedAuditId) => {
        setAuditTasks((prevAudit) =>
          prevAudit.filter((audit) => audit._id !== deletedAuditId)
        );
      });

      newSocket.on('updatedAudit', (updatedAudit) => {
        setAuditTasks((prevAudit) =>
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
        <h1 className='text-[20px] md:text-3xl text-primary font-[900]'>View or Edit Assigned Audits</h1>
      </div>
      <AssignedAuditDetails auditTasks={auditTasks} API={API} />
    </div>
  );
};

export default AssignedAudits;
