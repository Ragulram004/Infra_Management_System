import React from 'react';
import BarChart from '../../../components/BarChart';
import WeeklyAudit from '../../../components/WeeklyAudit';
import AuditorStats from '../../../components/AuditorStats';
import FixerStats from '../../../components/FixerStats';
import WeeklyAuditDeadline from '../../../components/WeeklyAuditDeadline';
import WeeklyFixerDeadline from '../../../components/WeeklyFixerDeadline';

const Dashboard = () => {
  return (
    <>
      <div className='md:flex gap-4'>
        <div className='w-full md:w-[70%] bg-white rounded-lg p-2 mb-4 md:mb-0'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Complaints Chart:</p>
          </div>
          <div>
            <BarChart />
          </div>
        </div>
        <div className='w-full md:w-[30%] bg-white rounded-lg p-2'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Weekly Audits Details:</p>
          </div>
          <div>
            <WeeklyAudit />
          </div>
        </div>
      </div>

      <div className='md:flex gap-4 mt-4'>
        <div className='w-full md:w-[50%] bg-white rounded-lg p-2 mb-4 md:mb-0'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Pending Audits of this Week:</p>
          </div>
          <div>
            <WeeklyAuditDeadline />
          </div>
        </div>
        <div className='w-full md:w-[50%] bg-white rounded-lg p-2'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Pending Fixes of this Week:</p>
          </div>
          <div>
            <WeeklyFixerDeadline />
          </div>
        </div>
      </div>

      <div className='md:flex gap-[1.3%] mt-4'>
        <div className='w-full md:w-[49.3%] bg-white rounded-lg p-2 mb-4 md:mb-0'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Auditor's Stats:</p>
          </div>
          <div>
            <AuditorStats />
          </div>
        </div>
        <div className='w-full md:w-[49.4%] bg-white rounded-lg p-2'>
          <div className='ml-2 mt-1 border-b'>
            <p className='text-sm font-bold text-primary px-1'>Fixer's Stats:</p>
          </div>
          <div>
            <FixerStats />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
