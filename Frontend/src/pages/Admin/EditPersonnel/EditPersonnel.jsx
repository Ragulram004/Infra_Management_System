import React, {  useEffect, useState } from 'react';
import Pop from '../../../components/Pop';
import PersonnelForm from './PersonnelForm';
import PersonnelDetails from './PersonnelDetails';
import { usePersonnelsContext } from '../../../hooks/usePersonnelContext';
import {useAuthContext} from '../../../hooks/useAuthContext'

const EditPersonnel = () => {
  const API = import.meta.env.VITE_INTRA_API_PERSONNEL
  const {user} = useAuthContext()
  const { personnels, dispatch } = usePersonnelsContext();
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    const fetchPersonnels = async () => {
      try {
        const response = await fetch(API,{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_PERSONNELS', payload: json });
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    if(user) fetchPersonnels();
  }, [dispatch,user]); 

  return (
    <div className='relative'>
      <div className='p-3' >
        <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Edit Personnel</h1>
      </div>
      <div className='absolute py-3 right-3'>
        <button 
          className='bg-primary text-white text-sm md:text-md  font-bold py-2 px-4  rounded-lg' 
          onClick={() => setShowPop(true)}
        >
          Add Personnel
        </button>
      </div> 
      <PersonnelDetails personnels={personnels || []} API={API} /> {/* Pass an empty array if `personnels` is null */}
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <PersonnelForm setShowPop={setShowPop} />
      </Pop>
    </div>
  );
};

export default EditPersonnel;
