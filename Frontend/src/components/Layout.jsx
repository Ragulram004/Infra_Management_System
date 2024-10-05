import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 h-full  bg-white transform ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-60 p-2 lg:p-4 bg-background overflow-y-auto">
        <Navbar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
        <div className='mt-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
