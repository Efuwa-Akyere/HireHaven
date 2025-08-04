import React from 'react'
import Navbar from '../pages/homePage/components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'

const RootLayout = () => {
  return (
    <div>
        
        <div className='flex bg-[#E7EAFC]'>
            <div className='flex-1/4 bg-white m-5'>
            <Sidebar />
        </div>
        <div className='flex-3/4  flex justify-center'>
            <Outlet />
        </div>
        </div>
    </div>
  )
}

export default RootLayout