import React from 'react'
import { FaRegCircleXmark } from "react-icons/fa6";
import { usePersonnelsContext } from '../hooks/usePersonnelContext';

const DeleteAlter = ({rowId , setShowPop }) => {
  const {dispatch} = usePersonnelsContext()

  const handleDelete = async (rowId) => {
    const response = await fetch('http://localhost:4500/api/personnel/'+rowId.original._id,{
      method: 'DELETE'
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_PERSONNEL' , payload:json})
    }
    setShowPop(false)
  };

  return (
    // <div onClick={() => handleDelete(rowId)}>
    //   delete
    // </div>
    <div className='flex flex-col justify-center items-center p-2'>
      <div className='p-2 pt-0'>
        <FaRegCircleXmark className='w-16 h-16 text-error    ' />      
      </div>
      <div className='text-center'>
        <h2 className='font-bold text-xl'>Are you sure?</h2>
        <p className='text-sm'>Do you want to delete this record? <br /> This Process CANNOT be undone.</p>
      </div>
      <div className='flex gap-2 p-2'>
        <button className='bg-primary text-white px-2 py-1 rounded-md' onClick={() => setShowPop(false)} >Cancel</button>
        <button className='bg-error text-white  px-2 py-1 rounded-md' onClick={() => handleDelete(rowId) }>Delete</button>
      </div>
    </div>
  )
}

export default DeleteAlter
