import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillGear } from 'react-icons/bs';
import { MdOutlineDashboard, MdOutlineEngineering } from 'react-icons/md';
import { AiOutlineFileSearch, AiOutlineAudit } from 'react-icons/ai';
import { LiaUserEditSolid } from "react-icons/lia";
import { VscTools } from "react-icons/vsc";
import { LiaToolsSolid } from "react-icons/lia";

import { useAuthContext } from '../hooks/useAuthContext';


export default function Sidebar({ sidebarVisible, setSidebarVisible }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    setSidebarVisible(!sidebarVisible);
  };



  return (
    <div id='sidebar' className='bg-white w-60 p-4 flex flex-col h-[100vh]'>
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
      {user?.role === 'admin' && (
        <>
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
            onClick={() => handleClick('Assigned_Audits')}
          >
            <div>
              <AiOutlineFileSearch fontSize={20} />
            </div>
            <div>
              <p>Assigned Audits</p>
            </div>
          </button>
          <button
            className='sidebar-button'
            onClick={() => handleClick('Assigned_Fixers')}
          >
            <div>
              <LiaToolsSolid fontSize={20} />
            </div>
            <div>
              <p>Assigned Fixers</p>
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
              <p>Auditor Report</p>
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
              <p>Fixer Report</p>
            </div>
          </button>
        </>
      )}

      {user?.role === 'auditor'  &&(
        <>
          <button
            className='sidebar-button'
            onClick={() => handleClick('Audit_Area')}
          >
            <div>
              <AiOutlineFileSearch fontSize={20} />
            </div>
            <div>
              <p>Assigned Audits</p>
            </div>
          </button>
        </>
      )}

      {user?.role === 'handyman' &&(
        <>
          <button
            className='sidebar-button'
            onClick={() => handleClick('Fix_Area')}
          >
            <div>
              <VscTools  fontSize={20} />
            </div>
            <div>
              <p>Fix Area</p>
            </div>
          </button>
        </>
      )}
    </div>
  );
}
