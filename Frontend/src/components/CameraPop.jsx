import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Pop from './Pop';  // Assuming the `Pop` component is already created
import { FaBandcamp } from "react-icons/fa";

const videoConstraints = {
  width: { ideal: 360 },  // Suitable width for mobile devices
  height: { ideal: 640 }, // Suitable height for mobile devices in portrait mode
  facingMode: 'user'      // Front-facing camera for mobile
};

const CameraPop = ({ isVisible, onClose }) => {
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
            <button className='bg-primary text-white font-bold text-md py-1 px-2 rounded-lg'>
              Submit
            </button>
          </div>
        )}
      </div>
    </Pop>
  );
};

export default CameraPop;
