import { useState, useEffect } from 'react';
import { BsCalendar2Week } from 'react-icons/bs';
import { useAuthContext } from '../hooks/useAuthContext';
import { GrCompliance } from "react-icons/gr";
import { GrStatusInfo } from "react-icons/gr";
import { GrDocumentMissing } from "react-icons/gr";


const WeeklyAudit = () => {
  const API = import.meta.env.VITE_INTRA_API_WEEKLYTASK;
  const { user } = useAuthContext();
  const [weeklyAudit, setWeeklyAudit] = useState([]);

  useEffect(() => {
    const fetchWeeklyAudit = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setWeeklyAudit(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchWeeklyAudit();
  }, [user]);

  // Calculate counts for Assigned, Completed, and Pending audits
  const assignedCount = weeklyAudit.length;
  const completedCount = weeklyAudit.filter(audit => audit.status === 'completed').length;
  const pendingCount = weeklyAudit.filter(audit => audit.status === 'pending').length;

  return (
    <>
      <div className="flex justify-between items-center border-b   border-border p-1">
        <div className='flex space-x-2 items-center text-[#7A7A7A]'>
          <BsCalendar2Week/>
          <p className="text-primary text-sm font-semibold">
            Weekly Audits Assigned <br /> Count:
          </p>
        </div>
        <div>
          <p className="text-primary font-extrabold text-3xl px-5 py-3">{assignedCount}</p>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-border p-1">
        <div className='flex space-x-2 items-center text-[#7A7A7A]'>
          <GrCompliance />
          <p className="text-primary text-sm font-semibold">
            Weekly Assigned Audits Completed <br /> Count:
          </p>
        </div>
        <div>
          <p className="text-primary font-extrabold text-3xl px-5 py-3">{completedCount}</p>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-border p-1">
        <div className='flex space-x-2 items-center text-[#7A7A7A]'>
          <GrDocumentMissing/>
          <p className="text-primary text-sm font-semibold">
            Weekly Assigned Audits Pending <br /> Count:
          </p>
        </div>
        <div>
          <p className="text-primary font-extrabold text-3xl px-5 py-3">{pendingCount}</p>
        </div>
      </div>
      <div className="flex justify-between items-center p-1">
        <div className='flex space-x-2 items-center text-[#7A7A7A]'>
         <GrStatusInfo />
          <p className="text-primary text-sm font-semibold">
            Weekly Assigned Audit Status:
          </p>
        </div>
        <div className="flex space-x-2 px-5 py-3">
          {pendingCount > 0 ? (
            <p className="bg-error text-white text-sm font-bold py-1 px-2 rounded">
            Pending
          </p>
          
          ):(
            <p className="bg-success text-white text-sm font-bold py-1 px-2 rounded">
              Completed
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WeeklyAudit;
