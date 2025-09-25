
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

const ESignup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "employer",
    companyName: "",
    industry: "",
    companySize: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.companyName) {
      return toast.error("Email, password, and company name are required");
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        toast.success("You have signed up successfully");
        navigate("/elogin", { replace: true });
      } else {
        toast.error(result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="bg-[#E7EAFC] p-6 flex justify-center items-center h-screen">
      <div className="bg-white flex flex-col  w-[30rem] py-10 shadow-2xl rounded-lg">
        <div className="text-[#0000FF]  flex justify-around ml-40 mb-5">
          <p className="font-bold text-xl">EMPLOYER SIGNUP</p>
          <Link to={"/"} className="cursor-pointer ml-6">
            Home
          </Link>
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              <div>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="border-1 border-[#1b1ba3] rounded-lg h-10 w-full pr-12 p-4"
                  required
                />
                <button className="absolute right-3 top-2/3 transform -translate-y-1/2">
                  <FaRegEyeSlash />
                </button>
              </div>
              
              <div>
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Enter your company name"
                  className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  placeholder="Enter your industry"
                  className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                />
              </div>
              
              <div>
                <label htmlFor="companySize">Company Size</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={(e) =>
                    setFormData({ ...formData, companySize: e.target.value })
                  }
                  className="border-1 border-[#1b1ba3] rounded-lg w-full h-10 p-4"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-500">101-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer"
              >
                Sign Up
              </button>
            </form>

            <ul className="flex gap-4 font-medium mt-4 justify-center">
              <Link to="/jsignup" className="hover:text-[#1b1ba3]">
                Job Seeker
              </Link>
              <span>|</span>
              <Link className="text-[#0000FF]">Employer</Link>
              <span>|</span>
              <Link to={"/asignup"} className="hover:text-[#1b1ba3]">
                Admin
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ESignup;
