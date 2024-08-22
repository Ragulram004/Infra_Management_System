import React from 'react'

const pop = ({isVisible , onClose, children}) => {
  if(!isVisible) return null

  const handleClose = (e)=>{
    if(e.target.id === 'wrapper') onClose();
  }

  return (
    <div 
      id='wrapper'
      className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] flex justify-center items-center z-50 '
      onClick={handleClose}  
    >
      <div className='w-[350px] md:w-[600px] flex flex-col overscroll-none'>
        <button 
        onClick={()=>onClose()}
          className='text-sm text-white place-self-end md:hidden bg-black opacity-50 w-7 h-7 rounded-full mb-1'
        >X</button>
        <div className='bg-white p-4 rounded-lg'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default pop
