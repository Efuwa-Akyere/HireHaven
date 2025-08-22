import LandingPic1 from '../../../assets/images/HeroPic.jpg'

const Hero = () => {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat h-[300px] flex items-center mt-10 px-20
                 max-md:px-10 max-sm:px-4 max-sm:h-[250px]"
      style={{ backgroundImage: `url(${LandingPic1})` }}
    >
    
      <div className="absolute inset-0 bg-blue-700/55"></div>

      
      <div className="relative z-10 max-w-5xl px-6 text-white
                      max-sm:text-center">
        <h2 className="text-4xl font-bold mb-2 max-sm:text-2xl">About Us</h2>
        <div className="w-16 h-[2px] bg-white mt-5 max-sm:mx-auto"></div>
        <p className="mt-6 max-w-xl max-sm:max-w-sm max-sm:mx-auto text-sm sm:text-base">
          Our website connects talented professionals with the right opportunities. 
          We make the hiring process simple, transparent, and efficient. Helping job seekers showcase 
          their skills while enabling employers to find the best candidates with ease.
        </p>
      </div>
    </section>
  )
}

export default Hero
