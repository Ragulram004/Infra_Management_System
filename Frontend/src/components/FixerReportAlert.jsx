import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import CameraPop from "./CameraPop";


const FixerReportAlert = ({ setShowPop,  selectedReport }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='text-center p-3 '>
        <h2 className='font-extrabold text-2xl text-primary underline'>Report By Capturing</h2> 
        <p className='text-primary text-xl font-bold'>Have You Fixed Issue? </p>
        <p className='text-primary text-sm '>If yes, Capture the Fixed area </p>
      </div>
      <div className='flex gap-2 p-2' >
        <button className='bg-primary text-white font-bold px-2 py-1 rounded-md' onClick={() => setShowPop(false)}>Cancel</button>
        <button 
          className='bg-error text-white font-bold px-2 py-1 rounded-md flex items-center'  
          onClick={() => console.log(selectedReport) }         
        >Capture <span className="ml-1"><CiCamera /></span></button>
      </div>
      <CameraPop setShowPop={setShowPop} isVisible={isCameraVisible} selectedReport={selectedReport} onClose={() => setIsCameraVisible(false)}  />
    </div>
  );
}

export default FixerReportAlert;
