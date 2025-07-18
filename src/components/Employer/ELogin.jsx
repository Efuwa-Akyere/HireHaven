import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ELogin = () => {
  return (
    <section className="bg-[#7382da] p-6 flex justify-center items-center h-screen">
      <div className="bg-white flex flex-col  w-[30rem] py-10 shadow-2xl rounded-lg">
        <div className="text-[#0000FF]  flex justify-around ml-40 mb-5">
            <p className="font-bold text-xl">LOGIN</p>
            <Link to={'/'} className="cursor-pointer ml-6">Home</Link>
          </div>
        <div className="flex flex-col justify-center items-center">
          
          <div className="flex flex-col gap-3 mb-5">
            <div className="text-gray-400">
            <p>Use your social accounts to signup</p>
          </div>
          <div className="flex gap-5 justify-center">
            <div>
              <FcGoogle size={25} />
            </div>
            <div className="text-[#0000FF]">
              <FaFacebook size={25} />
            </div>
            <div className="text-[#0505ac]">
              <FaLinkedin size={25} />
            </div>
          </div>
          <div className="flex text-gray-400 justify-center">
            <div className="flex self-center ">
              <hr className="w-[4rem] " />
            </div>
            <div className="px-1">
              <p>or continue with</p>
            </div>
            <div className="flex self-center">
              <hr className="w-[4rem]" />
            </div>
          </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="border-3 border-[#1b1ba3] rounded-lg w-full h-10 flex text-center"
              />
              <div className="relative">
              <input
                
                type="password"
                name="password"
                placeholder="Enter your password"
                className="border-3 border-[#1b1ba3] rounded-lg h-10 w-full pr-12 p-4"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaRegEyeSlash 
                  
                />
              </button>
            </div>
            </form>
            <div className="bg-[#1b1ba3] text-white flex justify-center font-bold rounded-lg h-10 w-full cursor-pointer">
              <button className="cursor-pointer">Log In</button>
            </div>
            <ul className="flex gap-1  mt-4">
              <li>Don't have an account?</li>
              <Link to={'/esignup'} className="text-[#0000FF]">Sign Up</Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ELogin