import React from 'react'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';


const VerifyAlert = ({setShowPop,  selectedReport }) => {
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const API = import.meta.env.VITE_INFRA_API_VERIFYREPORT

  const handleVerify = async (selectedReport) => {
    if(!user){
      navigate('/login')
      toast.error('You must be logged in')
      return
    }
    const response = await fetch(API+selectedReport._id,{
      method:'PATCH',
      body: JSON.stringify({status:'completed'}),
      headers:{
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const json = response.json()

    if(!response.ok){
      console.log(json.error)
    }

    if(response.ok){
      setShowPop(false)
      toast.success('Verified and Status updated',{
        autoClose:4000,
      })
    }
    
  };

  return (    
    <div className='flex flex-col justify-center items-center p-2'>
      <div className='p-2 pt-0 lg:pt-2'>
        <IoCheckmarkDoneCircleOutline  className='w-16 h-16 text-success' />      
      </div>
      <div className='text-center'>
        <h2 className='font-bold text-xl'>Are you sure?</h2>
        <p className='text-sm'>Do you want to Verify this report? <br /> This Process CANNOT be undone.</p>
      </div>
      <div className='flex gap-2 p-2'>
        <button className='bg-primary text-white px-2 py-1 rounded-md' onClick={() => setShowPop(false)} >Cancel</button>
        <button className='bg-success text-white  px-2 py-1 rounded-md' onClick={() => handleVerify(selectedReport)}>Verify Report</button>
      </div>
    </div>
  )
}

export default VerifyAlert
