import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../config/axios";

const ASignup = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const {username, password} = formData;
    if(!username || !password) {
      return toast.error('All fields are required');
    }

    try {
      const response = await api.post('/auth/asignup', {
        username,
        password,
      });
      console.log(response.data);

      if(response.data.success) {
        toast.success('You have signed up successfully');
        navigate('/alogin', {replace: true});
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <section className="bg-[#E7EAFC] p-6 flex justify-center items-center h-screen">
      <div className="bg-white flex flex-col  w-[30rem] py-10 shadow-2xl rounded-lg">
        <div className="text-[#0000FF]  flex justify-around ml-40 mb-5">
            <p className="font-bold text-xl">SIGNUP</p>
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
          <div className="flex flex-col gap-5 w-full px-10 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              {errorMessage ? errorMessage : null}
              <div>
                <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter your username"
                className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
              />
              </div>
              <div className="relative">
                <label htmlFor="">Password</label>
              <input
                
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="border-1 border-[#1b1ba3] rounded-lg h-10 w-full pr-12 p-4"
              />
              <button className="absolute right-3 top-2/3 transform -translate-y-1/2">
                <FaRegEyeSlash 
                  
                />
              </button>
            </div>
            <button
                type="submit"
                className="bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer"
              >
                Sign Up
              </button>
            </form>
             
            <ul className="flex gap-4 font-medium mt-4 justify-center">
              <Link to='/jsignup' className="hover:text-[#1b1ba3]">Job Seeker</Link>
              <span>|</span>
              <Link to={'/esignup'} className="hover:text-[#1b1ba3]">Employer</Link>
              <span>|</span>
              <li className="text-[#0000FF]">Admin</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ASignup