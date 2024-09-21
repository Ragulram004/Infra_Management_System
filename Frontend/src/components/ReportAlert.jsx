import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import CameraPop from "./CameraPop";


const ReportAlert = ({ setShowPop, API, rowId,selectedReport }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const handleNoIssue = async (rowId) => {
    if (!user) {
      navigate('/login');
      toast.error('You must be logged in');
      return;
    }

    // Send a PATCH request to update the status of the selected row
    const response = await fetch(API + rowId.original._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status: true })
    });

    const json = await response.json();

    if (response.ok) {      
      setShowPop(false);

      // Show success toast
      toast.success('Status updated to No Issue successfully', {
        autoClose: 4000,
      });
    } else {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='text-center '>
        <h2 className='font-extrabold text-2xl text-primary underline'>Report Issue</h2> 
        <p className='text-primary text-xl font-bold'>Is There any Issue? </p>
        <p className='text-primary text-sm '>If yes, Capture the issue </p>
      </div>
      <div className='flex gap-2 p-2' >
        <button className='bg-primary text-white font-bold px-2 py-1 rounded-md' onClick={() => setShowPop(false)}>Cancel</button>
        <button className='bg-success text-white font-bold px-2 py-1 rounded-md' onClick={() => handleNoIssue(rowId)}>No Issue</button>
        <button 
          className='bg-error text-white font-bold px-2 py-1 rounded-md flex items-center'  
          onClick={() => setIsCameraVisible(true)}         
        >Capture <span className="ml-1"><CiCamera /></span></button>
      </div>
      <CameraPop isVisible={isCameraVisible} selectedReport={selectedReport} onClose={() => setIsCameraVisible(false)}/>
    </div>
  );
}

export default ReportAlert;
