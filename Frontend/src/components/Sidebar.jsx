import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillGear } from 'react-icons/bs';
import { MdOutlineDashboard, MdOutlineEngineering } from 'react-icons/md';
import { AiOutlineFileSearch, AiOutlineAudit } from 'react-icons/ai';
import { LiaUserEditSolid } from "react-icons/lia";


export default function Sidebar({ sidebarVisible, setSidebarVisible }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className='bg-white w-60 p-4 flex flex-col h-screen'>
      <div className='flex justify-center items-center gap-1 px-1 py-3 text-primary mb-4'>
        <BsBuildingFillGear fontSize={24} />
        <span className='text-2xl font-black'>Infra-Audits</span>
      </div>
      <div className='text-md font-extrabold text-primary'>Dashboard</div>
      <button
        className='sidebar-button'
        onClick={() => handleClick('/')}
      >
        <div>
          <MdOutlineDashboard fontSize={20} />
        </div>
        <div>
          <p>Dashboard</p>
        </div>
      </button>
      <div className='text-md font-extrabold text-primary'>Actions</div>
      <button
        className='sidebar-button'
        onClick={() => handleClick('Assign_Audit')}
      >
        <div>
          <AiOutlineFileSearch fontSize={20} />
        </div>
        <div>
          <p>Assign Audit</p>
        </div>
      </button>
      <button
        className='sidebar-button'
        onClick={() => handleClick('Edit_Personnels')}
      >
        <div>
          <LiaUserEditSolid  fontSize={20} />
        </div>
        <div>
          <p>Edit Personnel</p>
        </div>
      </button>
      <div className='text-md font-extrabold text-primary'>Reports</div>
      <button
        className='sidebar-button'
        onClick={() => handleClick('Auditor_Report')}
      >
        <div>
          <AiOutlineAudit fontSize={20} />
        </div>
        <div>
          <p>Auditor</p>
        </div>
      </button>
      <button
        className='sidebar-button'
        onClick={() => handleClick('Handyman_Report')}
      >
        <div>
          <MdOutlineEngineering fontSize={20} />
        </div>
        <div>
          <p>Handyman</p>
        </div>
      </button>
    </div>
  );
}
