import { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";

import DatePicker from '../../../components/DatePicker';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';

const AuditorForm = ({ setShowPop, selectedAuditor }) => {
  const API = import.meta.env.VITE_INTRA_API_AUDITTASK

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  
  const [deadline, setDeadline] = useState('');
  const [openCalender , setOpenCalender] = useState(false)
  const [error, setError] = useState(null)
  const [emptyFields,setEmptyFields]= useState([])
  const {user} = useAuthContext()

  useEffect(() => {
    if (selectedAuditor) {
      setName(selectedAuditor.name);
      setDept(selectedAuditor.dept);
      setEmail(selectedAuditor.email);
      setPhone(selectedAuditor.phone);
      setRole(selectedAuditor.role);
      setGender(selectedAuditor.gender);
    }
  }, [selectedAuditor]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      navigate('/login')
      toast.error('You must be logged in')
      return
    }

    const audit = { name, dept, phone, email, deadline, area , role, gender };

    const response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(audit),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields || [])
      toast.error(json.error)
    }
    if (response.ok) {
      setName('');
      setDept('');
      setEmail('');
      setPhone('');
      setDeadline('');
      setArea('');
      setError(null);
      setShowPop(false);
      navigate('/Assigned_Audits');
      toast.success("Audit Assigned Successfully")
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form className="w-[100%] md:w-auto bg-white p-6 pt-2 lg:pt-6 rounded-lg" onSubmit={handleSubmit} >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-primary underline">Assign Auditor</h2>

        <div className="md:flex flex-row justify-between">
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="input-field cursor-not-allowed"
              id="name"
              value={name}
              type="text"
              disabled
            />
          </div>

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
        </div>

        <div className="md:flex flex-row justify-between">
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
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="area">
            Area to Audit:
          </label>
          <select
            className={emptyFields.includes('Area')? 'input-field-error' : 'input-field'}
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="select">Select Area</option>
            <option value="Main Auditorium Stage">Main Auditorium Stage</option>
            <option value="Learning Centre Backside Restroom">Learning Centre Backside Restroom</option>
            <option value="Football Playground Restroom">Football Playground Restroom</option>
            <option value="SF Block VIP Lounge">SF Block VIP Lounge</option>
            <option value="Vedanayagam Auditorium VIP Lounge">Vedanayagam Auditorium VIP Lounge</option>
            <option value="Indoor Stadium">Indoor Stadium</option>
            <option value="Main Parking Restrooms">Main Parking Restrooms</option>
            <option value="Hostel Canteen Premises">Hostel Canteen Premises</option>
            <option value="Chairman's Room and Chief Executive Room - Old Mech Seminar Hall">Chairman's Room and Chief Executive Room - Old Mech Seminar Hall</option>
            <option value="New Store Room">New Store Room</option>
            <option value="Tennis Ground">Tennis Ground</option>
            <option value="Quarters">Quarters</option>
            <option value="Board Room - SF Block (First Floor)">Board Room - SF Block (First Floor)</option>
          </select>

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
  );
};

export default AuditorForm;
