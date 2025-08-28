import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import toast from "react-hot-toast";

const ALogin = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const {adminLogin} = useContext(AdminAuthContext);

  const [admin, setAdmin] = useState({
    username: '',
    password: '',
  });

  async function handleLogin(e) {
    e.preventDefault();

    if(!admin.username || !admin.password) {
      return toast.error('username or password is required');
    }

    try {
      const response = await adminLogin(
        admin.username,
        admin.password,
      );
      console.log(response);

      if(response?.success) {
        toast.success('You have logged in successsfully');
        return navigate('/rootlayout', {replace: true})
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
          <div className="flex flex-col gap-5 w-full px-10">
            <form onSubmit={handleLogin} className="flex flex-col gap-y-5 w-full">
              {errorMessage ? errorMessage : null}
              <div>
                <label htmlFor="">Username</label>
              <input
              value={admin.username}
                onChange={(e) => setAdmin({...admin, username: e.target.value})}
                type="text"
                name="username"
                placeholder="Enter your username"
                className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
              />
              </div>
              <div className="relative">
                <label htmlFor="">Password</label>
              <input
                value={admin.password}
                onChange={(e) => setAdmin({...admin, password: e.target.value})}
                type="password"
                name="password"
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
                Login
              </button>
            </form>
            
            <ul className="flex gap-1  mt-4">
              <li>Don't have an account?</li>
              <Link to={'/asignup'} className="text-[#0000FF]">Sign Up</Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ALogin