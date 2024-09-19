import React from 'react'
import { FaRegCircleXmark } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';


const DeleteAlert = ({rowId , setShowPop,API }) => {
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleDelete = async (rowId) => {
    if(!user){
      navigate('/login')
      toast.error('You must be logged in')
      return
    }
    const response = await fetch(API+rowId.original._id,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      setShowPop(false)
      toast.success('Removed Successfully',{
        autoClose:4000,
      })
    }
    
  };

  return (    
    <div className='flex flex-col justify-center items-center p-2'>
      <div className='p-2 pt-0 lg:pt-2'>
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

export default DeleteAlert
