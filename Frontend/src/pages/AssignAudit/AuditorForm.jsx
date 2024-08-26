import { useState, useEffect , useRef } from 'react';
import { usePersonnelsContext } from '../../hooks/usePersonnelContext';
import DatePicker from '../../components/DatePicker';
const AuditorForm = ({ setShowPop, selectedAuditor }) => {

  const calRef = useRef();
  const { dispatch } = usePersonnelsContext();
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  
  const [deadLine, setDeadLine] = useState('');
  const [openCalender , setOpenCalender] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedAuditor) {
      setName(selectedAuditor.name);
      setDept(selectedAuditor.dept);
      setPhone(selectedAuditor.phone);
    }
  }, [selectedAuditor]);

  const hideOnClickOutside = (e) => {
    if (calRef.current && !calRef.current.contains(e.target)) {
      setOpenCalender(false);
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const personnel = { name, dept, phone, deadline, area };

  //   const response = await fetch('http://localhost:4500/api/personnel', {
  //     method: 'POST',
  //     body: JSON.stringify(personnel),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const json = await response.json();

  //   if (!response.ok) {
  //     setError(json.error);
  //   }
  //   if (response.ok) {
  //     setName('');
  //     setDept('');
  //     setPhone('');
  //     setDeadline('');
  //     setArea('');
  //     setError(null);
  //     dispatch({ type: 'CREATE_PERSONNEL', payload: json });
  //     setShowPop(false); 
  //   }
  // };

  return (
    <div className="flex justify-center items-center">
      <form className="w-[100%] md:w-auto bg-white p-6 pt-2 lg:pt-6 rounded-lg" >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-primary">Assign Auditor</h2>

        <div className="md:flex flex-row justify-between">
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="input-field"
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
              className="input-field"
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
              className="input-field"
              id="phone"
              value={phone}
              type="text"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2">
              Deadline:
            </label>
            <div className="relative" onClick={() => setOpenCalender(!openCalender)}>
              <input
                type="text"
                className="input-field w-full pl-3 pr-10 py-2 border-b border-gray-300 focus:outline-none"
                placeholder="DD/MM/YYYY"
                value={deadLine}
                readOnly
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 11h14m2 9a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </div>
            {openCalender && <DatePicker className="absolute" setDeadLine={setDeadLine} setOpenCalender={setOpenCalender} />}          
          </div>         
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="area">
            Area to Audit:
          </label>
          <select
            className="input-field"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="select">Select</option>
            <option value="main-auditorium-stage">Main Auditorium Stage</option>
            <option value="learning-centre-backside-restroom">Learning Centre Backside Restroom</option>
            <option value="football-playground-restroom">Football Playground Restroom</option>
            <option value="sf-block-vip-lounge">SF Block VIP Lounge</option>
            <option value="vedanayagam-auditorium-vip-lounge">Vedanayagam Auditorium VIP Lounge</option>
            <option value="indoor-stadium">Indoor Stadium</option>
            <option value="main-parking-restrooms">Main Parking Restrooms</option>
            <option value="hostel-canteen-premises">Hostel Canteen Premises</option>
            <option value="near-old-mechanical-seminar-hall">Chairman's Room and Chief Executive Room - Old Mech Seminar Hall</option>
            <option value="new-store-room">New Store Room</option>
            <option value="tennis-ground">Tennis Ground</option>
            <option value="quarters">Quarters</option>
            <option value="board-room-sf-block-first-floor">Board Room - SF Block (First Floor)</option>
          </select>
        </div>

        {error && 
          <div className='text-error '>
            {error}
          </div>
        }

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
