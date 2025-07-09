import React from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../components/LandingPage'
import AfterLandingPage from '../components/AfterLandingPage'
import Categories from '../components/Categories'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <LandingPage />
        <AfterLandingPage />
        <Categories />
    </div>
  )
}

export default HomePage