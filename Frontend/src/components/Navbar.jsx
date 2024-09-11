import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoReorderThree } from 'react-icons/io5';
import classNames from 'classnames';
import { useNavigate} from 'react-router-dom' 
import { useLogout } from '../hooks/useLogout';

export default function Navbar({ sidebarVisible, setSidebarVisible }) {
  const {logout} = useLogout();
  const navigate = useNavigate();

  const handleClick = ()=>{
    logout()
    navigate('/login')
  }

  return (
    <div className='bg-white h-14 px-4 flex items-center border-b border-gray-200 justify-between rounded-lg'>
      <div className='relative text-xs lg:text-sm font-bold'>
        <p>Welcome</p>
        {/* <p>Vishwanathan G</p> */}
      </div>
      <div className='flex items-center gap-2 mr-2'>
        <Menu as='div' className='relative'>
          <Menu.Button className='ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400'>
            <span className='sr-only'>Open user menu</span>
            <div
              className='h-7 w-7 lg:h-10 lg:w-10 rounded-full bg-primary bg-cover bg-no-repeat bg-center'
              style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
            >
              <span className='sr-only'>User</span>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-lg shadow-md p-1 bg-white ring-1 ring-primary ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && 'bg-error text-white',
                      'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-primary text-sm font-semibold'
                    )}
                    onClick={handleClick}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <IoReorderThree
          fontSize={24}
          className='lg:hidden cursor-pointer'
          onClick={() => setSidebarVisible(!sidebarVisible)}
        />
      </div>
    </div>
  );
}
