import React, { useEffect, useState } from 'react';
import AuditorDetails from './AuditorDetails';

const AssignAudit = () => {
  const API = import.meta.env.VITE_INTRA_API_PERSONNEL
  const [auditors, setAuditors] = useState(null);

  useEffect(() => {
    const fetchAuditors = async () => {
      try {
        const response = await fetch(API);
        const json = await response.json();

        if (response.ok) {
          // Filter the personnel data to only include auditors
          const auditorsData = json.filter(personnel => personnel.role === 'auditor');
          setAuditors(auditorsData);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };

    fetchAuditors();
  }, []);   

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900]'>Assign Audit to Auditor</h1>
      </div>
      <AuditorDetails auditors={auditors || []} /> 
    </div>
  );
};

export default AssignAudit;
