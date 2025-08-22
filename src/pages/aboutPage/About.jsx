import React from 'react'
import Navbar from '../homePage/components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import WhatWeDo from './components/WhatWeDo'
import Footer from '../homePage/components/Footer'

const About = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <WhatWeDo />
        <Mission />
        <Footer />
    </div>
  )
}

export default About