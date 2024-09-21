import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Pop from './Pop';  // Assuming the `Pop` component is already created
import { FaBandcamp } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: { ideal: 360 },  // Suitable width for mobile devices
  height: { ideal: 640 }, // Suitable height for mobile devices in portrait mode
  facingMode: 'user'      // Front-facing camera for mobile
};

const CameraPop = ({ isVisible, onClose ,selectedReport }) => {
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    // Trigger blink effect
    setIsBlinking(true);

    // Capture the image after a brief delay for the blink effect
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setIsBlinking(false); // Reset the blink effect after capture
    }, 200); // 200ms for the blink effect duration
  }, [webcamRef]);

  const handleRetake = () => setImage('');

  function base64ToBlob(base64Data, contentType = 'image/jpeg', sliceSize = 512) {
    const byteCharacters = atob(base64Data.split(',')[1]); // Remove the `data:image/jpeg;base64,` prefix
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}


  const handleSubmit = async () => {
    if(!user){
      navigate('/login');
      toast.error('You must be logged in');
      return;
    }
    const imageBlob = base64ToBlob(image);
    const formData = new FormData();

    formData.append('name',selectedReport.name);
    formData.append('phone',selectedReport.phone);
    formData.append('email',selectedReport.email);
    formData.append('area',selectedReport.area);
    formData.append('image', imageBlob, 'image.jpg');
    try{
      const response = await fetch('http://localhost:4500/api/auditReport', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();
      if(response.ok){
        toast.success('Report submitted successfully');
        onClose();
      }else{
        console.log('Failed to submit report',json.error);
      }
    }catch(error){
      console.log(error);
    }

    
  }

  return (
    <Pop isVisible={isVisible} onClose={onClose}>
      <div className="webcam-container flex flex-col items-center relative">
        {/* Blink overlay for flash effect */}
        {isBlinking && (
          <div className="absolute inset-0 bg-white opacity-80 z-10 animate-blink"></div>
        )}
        
        <div className="webcam-img mb-4">
          {image === '' ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg"
            />
          ) : (
            <img src={image} alt="Captured" className="rounded-lg" />
          )}
        </div>

        <div className='absolute bottom-36'>
          {image === '' ? (
            <button
              onClick={capture}
              className="text-white bg-primary rounded-full p-1"
            >
              <FaBandcamp fontSize={50}/>
            </button>
          ) : null}
        </div>

        {image !== '' && (
          <div className='flex gap-3'>
            <button
              onClick={handleRetake}
              className="bg-error text-white font-bold text-md py-1 px-2 rounded-lg"
            >
              Retake
            </button>          
            <button className='bg-primary text-white font-bold text-md py-1 px-2 rounded-lg'
            onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </Pop>
  );
};

export default CameraPop;
