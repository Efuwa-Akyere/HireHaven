import React from 'react'
import Navbar from '../pages/homePage/components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-[#E7EAFC]'>
      <div className='flex flex-col lg:flex-row'>
        
        <div className='lg:w-1/4 w-full'>
          <Sidebar />
        </div>

      
        <div className='lg:w-3/4 w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
