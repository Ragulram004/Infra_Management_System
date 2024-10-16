import React from 'react';
import BarChart from '../../../components/BarChart';
import WeeklyAudit from '../../../components/WeeklyAudit';

const Dashboard = () => {
  return (
    <>
      <div className='md:flex  gap-4 '>
        <div className='md:w-[70%] bg-white rounded-lg p-2 mb-4 md:mb-0'>
          <div className='ml-2 mt-1'>
            <p className='text-sm font-bold text-primary'>Complaints Chart:</p>
          </div>
          <div>
            <BarChart />
          </div>
        </div>
        <div className='md:w-[30%] bg-white rounded-lg p-2'>
          <div className='ml-2 mt-1 shadow-xl'>
            <p className='text-sm font-bold text-primary'>Weekly Audits:</p>
          </div>
          <div>
            <WeeklyAudit />
          </div>
        </div>
      </div>
      <div className='md:flex  gap-4 mt-4'>
        <div className='md:w-[50%] bg-white rounded-lg mb-4 md:mb-0'>
          c
        </div>
        <div className='md:w-[50%] bg-white rounded-lg'>
          k
        </div>
      </div>
    </>
  );
}

export default Dashboard;
