import {useState,useEffect} from 'react'
import HandymanTaskDetails from './HandymanTaskDetails'
import { useAuthContext } from '../../../hooks/useAuthContext'
import io from 'socket.io-client'
import { AiOutlineAudit } from 'react-icons/ai';
import { TbMessageReport } from "react-icons/tb";
import { VscTools } from "react-icons/vsc";

const HandymanTask = () => {
  const API = import.meta.env.VITE_INFRA_API_FILTERFIXER
  const {user} = useAuthContext()
  const [socket,setSocket] = useState(null)
  const [tasks,setTasks] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  

  useEffect(() => {
    const fetchHandymanTasks = async () => {
      try{
        setLoading(true)
        const response = await fetch(API, {
          method: 'POST',
          body: JSON.stringify({email: user.email}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if(response.ok){
          console.log(json)
          // const filteredTasks = json.filter(task => task.email === user.email)
          // const reversed = filteredTasks.reverse()
          // console.log(reversed)
          // setTasks(reversed)
        }
      }catch  (error){
        console.log("Fetch Error:", error);
      }finally{
        setLoading(false)
      }
    }
    if(user){
      fetchHandymanTasks()

      const newSocket = io('http://localhost:4500')
      setSocket(newSocket)

     return ()=>{
      if(newSocket) newSocket.disconnect();
     }      
    }
  },[user])

  useEffect(()=>{
    if(socket){
      const handleNewTask = (newTask) =>{
        setTasks((prevTasks) =>[newTask,...prevTasks])
      }
      const handleDeleteTask = (deletedTaskId) =>{
        setTasks((prevFix) => prevFix.filter((fix)=>fix._id !== deletedTaskId))
      }

      socket.on('createdFix',handleNewTask)
      socket.on('deletedFix',handleDeleteTask)
      return()=>{
        socket.off('createdFix',handleNewTask)
        socket.off('deletedFix',handleDeleteTask)
      }
    }
  },[socket])

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className='relative'>
      <div className='p-3'>
      <h1 className='text-[20px] md:text-3xl text-primary font-[900] '>View or Report Fixer Tasks</h1>
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <p className='text-primary font-bold text-xl'>Loading Tasks...</p>
        </div>
      ):(
        <div className='flex flex-wrap gap-5 justify-center'>
          {tasks.map((task) => (
            <div key={task._id} className='shadow-md rounded-lg overflow-hidden relative hover:bg-white'>
              {task.reportId.imagepath && (
                <div className='flex flex-col items-center'>
                  <div className='px-5 py-2 flex items-center gap-2'>
                    <div className='text-[#4169e1]'>
                      <VscTools fontSize={20} />
                    </div>
                    <div className='w-56 '>
                      <p className='text-primary text-sm font-bold truncate' title={task.area}>
                        {task.reportId.area}
                      </p>
                      <p className='text-primary text-xs truncate' title={`${task.name} · ${task.phone}`}>
                        <span className='font-bold'>Assigned To:</span> {task.name} · {task.phone}
                      </p>
                    </div>
                  </div>
                  <div className='px-2 '>
                    <img
                      src={`http://localhost:4500${task.reportId.imagepath}`}
                      alt='Task'
                      className='w-[270px] h-[200px] object-cover cursor-pointer rounded-md'
                      onClick={() => handleImageClick(`http://localhost:4500${task.reportId.imagepath}`)}
                    />
                  </div>
                  <div className='px-5 py-1 text-sm flex gap-2'>
                    <div className='text-error'>
                      <TbMessageReport fontSize={18} />
                    </div>
                    <p>
                      Deadline to Report <span className='font-bold'>· {task.deadline}</span>
                    </p>
                  </div>
                  <div className='pb-2 px-2 w-full flex justify-between items-center'>
                    <div className=''>
                      <p className='text-primary text-sm font-bold'>Status: 
                        <span
                            className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold whitespace-nowrap ml-1 ${
                              task.reportId.status === 'completed' ? 'border-2 border-success' : 'border-2 border-error'
                            }`}
                          >
                            {task.reportId.status === 'completed' ? '🟢 Completed' : '🔴 Pending'}
                        </span>
                      </p>
                    </div>
                    <div className=''>
                      <button
                        className='bg-primary text-white text-sm md:text-md font-bold py-2 px-2 rounded-lg'
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

        {selectedImage && (
          <div className='fixed inset-0 bg-black bg-opacity-65 backdrop-blur-[2px] flex items-center justify-center z-50' onClick={handleCloseImage}>
            <img src={selectedImage} alt='Full Screen' className='max-w-full max-h-full' />
            <button className='absolute top-4 right-4 text-white text-2xl' onClick={handleCloseImage}>×</button>
          </div>
        )}

        </div>
      )}
    </div>
  )
}

export default HandymanTask
