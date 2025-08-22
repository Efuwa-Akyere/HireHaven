import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import AfterLandingPage from './components/AfterLandingPage'
import Categories from './components/Categories'
import CvPage from './components/CvPage'
import Footer from './components/Footer'
import BrowseJobs from './components/BrowseJobs'
import ContactUs from '../../components/ContactUs'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <LandingPage />
        <AfterLandingPage />
        <Categories />
        <CvPage />
        <BrowseJobs />
        <Footer />
    </div>
  )
}

export default HomePage