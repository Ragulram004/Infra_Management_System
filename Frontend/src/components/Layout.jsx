import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className='flex h-screen w-screen flex-row'>
      <div className={`lg:block ${sidebarVisible ? 'block' : 'hidden'} absolute lg:relative z-10`}>
        <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
      </div>
      <div className='p-2 lg:p-3 w-screen'>  
        <div>
          <Navbar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
        </div>
        <div className='bg-background'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
