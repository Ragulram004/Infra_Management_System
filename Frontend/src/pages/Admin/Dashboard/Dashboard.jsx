import React from 'react';
import BarChart from '../../../components/BarChart';

const Dashboard = () => {
  return (
    <>
      <div className='md:flex  gap-4 '>
        <div className='md:w-[70%] bg-white rounded-lg mb-4 md:mb-0'>
          <div className='ml-2 mt-1'>
            <p className='text-sm font-bold '>Complaints Graphs:</p>
          </div>
          <div>
            <BarChart />
          </div>
        </div>
        <div className='md:w-[30%] bg-white rounded-lg'>
  u
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
