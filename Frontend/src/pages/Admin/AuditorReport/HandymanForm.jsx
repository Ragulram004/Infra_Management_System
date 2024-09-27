import {useEffect, useState} from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import DatePicker from '../../../components/DatePicker';
import { toast } from 'react-toastify';
import { FaRegCalendarAlt } from "react-icons/fa";


const HandymanForm = ({setShowPop, selectedReport}) => {
  const API = import.meta.env.VITE_INTRA_API_PERSONNEL

  const {user} = useAuthContext()

  const [personnel, setPersonnel] = useState([]);
  const [area,setArea] = useState('')
  const [name,setName] = useState('');
  const [dept,setDept] = useState('');
  const [phone, setPhone] = useState('');
  const [deadline, setDeadline] = useState('');
  const [emptyFields,setEmptyFields]= useState([])
  const [openCalender , setOpenCalender] = useState(false)
  const [handyman, sethanyman] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(handyman)
    // setShowPop(false);
  }

  useEffect(()=>{
    if(selectedReport){
      setArea(selectedReport.area)
    }
  },[])

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if(!response.ok) {
          setError(json.error)
          setPersonnel([]);
          setEmptyFields(json.emptyFields || []);
          toast.error(json.error)
        }      
        
  
        const json = await response.json();        
  
        if (Array.isArray(json)) {
          const filteredPersonnel = json.filter(person => person.role === 'handyman');
          setPersonnel(filteredPersonnel);
        } else {
          console.error('Unexpected response format:', json);
          setPersonnel([]); // Set an empty array if the format is unexpected
        }
      } catch (error) {
        console.error('Error fetching personnel:', error);
        setPersonnel([]); // Set to an empty array on error
      }
    };
  
    if (user) {
      fetchPersonnel();
    }
  }, []);


  const handleAutoFill = (id) => {
    const person = personnel.find((person) => person._id === id);
    if (person) {
      sethanyman(person);
      setDept(person.dept);
      setPhone(person.phone);
    }
  }
  return (
    <div className="flex justify-center items-center">
      <form className="w-[100%] md:w-auto bg-white p-6 pt-2 lg:pt-6 rounded-lg" onSubmit={handleSubmit}  >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-primary underline">Assign Handyman</h2>
        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="area">
            Name:
          </label>
          {user.role === 'admin' ? (
            <select
              className={emptyFields.includes('name') ? 'input-field-error' : 'input-field'}
              id="area"
              value={name}
              onChange={(e) => {
                const id = e.target.value
                setName(id)
                handleAutoFill(id)
              }}
            >
              <option value="select">Select HandyMan</option>
              {Array.isArray(personnel) && personnel.length > 0 ? (
                personnel.map((person) => (
                  <option 
                    key={person._id} 
                    value={person._id}
                  >{person.name} ({person.email})</option>
                ))
              ) : (
                <option value="">No Handymen Available</option>
              )}
            </select>
          ) : (
            <p>Not Authorized to view personnel.</p>
          )}
        </div>

        <div className="md:flex flex-row justify-between">          
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2">
              DeadLine:
            </label>
            <div className="relative" onClick={() => setOpenCalender(!openCalender)}>
              <input
                type="text"
                className={emptyFields.includes('Deadline')? 'input-field-error' : 'input-field w-full pl-3 pr-10 py-2 border-b border-gray-300 focus:outline-none'}
                placeholder="DD/MM/YYYY"
                value={deadline}
                readOnly
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                <FaRegCalendarAlt />
              </span>
            </div>
            <div className='absolute'>
              {openCalender && <DatePicker className="absolute" setDeadline={setDeadline} setOpenCalender={setOpenCalender} />}          
            </div>
          </div> 
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="area">
              Area to Handyman:
            </label>
            <input
              className="input-field cursor-not-allowed"
              id="area"
              value={area}
              type="text"
              disabled
            />         
          </div>        
        </div>

        <div className="md:flex flex-row justify-between gap-8">      
          <div className="mb-6">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="dept">
              Department:
            </label>
            <input
              className="input-field cursor-not-allowed"
              id="dept"
              value={dept}
              type="text"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              className="input-field cursor-not-allowed"
              id="phone"
              value={phone}
              type="text"
              disabled
            />
          </div>
        </div>

        

        <div className="flex items-center justify-center">
          <button
            className="bg-primary hover:bg-gray-600 text-white font-extrabold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  )
}

export default HandymanForm
