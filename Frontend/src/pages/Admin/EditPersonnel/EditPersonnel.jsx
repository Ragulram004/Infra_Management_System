import React, { useEffect, useState } from 'react';
import Pop from '../../../components/Pop';
import PersonnelForm from './PersonnelForm';
import PersonnelDetails from './PersonnelDetails';
import { useAuthContext } from '../../../hooks/useAuthContext';
import io from 'socket.io-client';

const EditPersonnel = () => {
  const API = import.meta.env.VITE_INTRA_API_PERSONNEL;
  const { user } = useAuthContext();
  const [personnels, setPersonnels] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    const fetchPersonnels = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          setPersonnels(json);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      }
    };
    
    if (user) fetchPersonnels();

    // Initialize socket connection
    const newSocket = io('http://localhost:4500');
    setSocket(newSocket);


    // Listen for real-time personnel creation
    newSocket.on('createPersonnel', (newPersonnel) => {
      setPersonnels((prevPersonnels) => [newPersonnel, ...prevPersonnels]);
    });

    // Listen for real-time personnel deletion
    newSocket.on('deletePersonnel', (deletedPersonnelId) => {
      setPersonnels((prevPersonnels) =>
        prevPersonnels.filter((personnel) => personnel._id !== deletedPersonnelId)
      );
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900]'>View or Edit Personnel</h1>
      </div>
      <div className='absolute py-3 right-3'>
        <button 
          className='bg-primary text-white text-sm md:text-md font-bold py-2 px-4 rounded-lg' 
          onClick={() => setShowPop(true)}
        >
          Add Personnel
        </button>
      </div>
      <PersonnelDetails personnels={personnels} API={API} />
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <PersonnelForm setShowPop={setShowPop} />
      </Pop>
    </div>
  );
};

export default EditPersonnel;
