import {useState,useEffect} from 'react'
import AssignedFixersDetails from './AssignedFixersDetails'
import { useAuthContext } from '../../../hooks/useAuthContext'
import io from 'socket.io-client'

const AssignedFixers = () => {
  const API = import.meta.env.VITE_INFRA_API_FIXERTASK
  const [socket, setSocket] = useState(null)
  const [fixerTasks, setFixerTasks] = useState([])
  const { user } = useAuthContext()

  useEffect(()=>{
    const fetchAssignedFixers = async()=>{
      try{
        const response = await fetch(API,{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if(response.ok){
          console.log(json)
          setFixerTasks(json);
        }
      }catch(error){
        console.log("Fetch Error:",error)
      }
    }
    if(user){
      fetchAssignedFixers();

      const newSocket = io('http://localhost:4500')
      setSocket(newSocket);

      newSocket.on('createdFix',(newFix)=>{
        setFixerTasks((prevFix) => [newFix , ...prevFix])
      })

      newSocket.on('deletedFix',(deletedFixId) =>{
        setFixerTasks((prevFix) => prevFix.filter((fix)=>fix._id !== deletedFixId))
      })

      newSocket.on('updatedFix',(updatedFix)=>{
        setFixerTasks((prevFix)=>
          prevFix.map((fix)=>
            fix._id === updatedFix._id ? updatedFix:fix
          )
        )
      })

      return()=>{
        newSocket.disconnect();
      }
    }
  },[user])

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900]'>View or Edit Assigned Fixers</h1>
      </div>
      <AssignedFixersDetails fixerTasks={fixerTasks} API={API} />
    </div>
  )
}

export default AssignedFixers
