import React from 'react';

const Pop = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="w-[350px] md:w-auto flex flex-col bg-white rounded-lg p-2">
        <button
          onClick={() => onClose()}
          className="text-sm text-white self-end bg-black opacity-50 w-7 h-7 rounded-full mb-2"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Pop;
