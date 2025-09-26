import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const JsignUp = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await register(formData);
    
    if (result.success) {
      toast.success("Account created successfully! Please login to continue.");
      navigate('/jlogin');
    } else {
      toast.error(result.error || "Signup failed. Please try again.");
    }
  };

  return (
    <section className="bg-[#E7EAFC] p-6 flex justify-center items-center min-h-screen">
      <div className="bg-white flex flex-col w-full max-w-md py-10 shadow-2xl rounded-lg">
        <div className="text-[#0000FF] flex justify-between items-center px-10 mb-5">
          <p className="font-bold text-xl">SIGNUP</p>
          <Link to={'/'} className="cursor-pointer text-sm hover:underline">Home</Link>
        </div>

        <div className="flex flex-col justify-center items-center px-10">
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 mb-5 w-full">
            <div className="text-gray-400 text-center">
              <p>Use your social accounts to signup</p>
            </div>
            <div className="flex gap-5 justify-center">
              <button className="p-2 hover:bg-gray-100 rounded">
                <FcGoogle size={25} />
              </button>
              <button className="text-[#0000FF] p-2 hover:bg-blue-50 rounded">
                <FaFacebook size={25} />
              </button>
              <button className="text-[#0505ac] p-2 hover:bg-blue-50 rounded">
                <FaLinkedin size={25} />
              </button>
            </div>
            <div className="flex text-gray-400 justify-center items-center gap-2">
              <hr className="flex-1" />
              <span className="px-2 text-sm">or continue with</span>
              <hr className="flex-1" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`border-2 rounded-lg w-full h-10 px-3 focus:outline-none focus:border-blue-500 ${
                    formErrors.firstName ? 'border-red-500' : 'border-[#1b1ba3]'
                  }`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`border-2 rounded-lg w-full h-10 px-3 focus:outline-none focus:border-blue-500 ${
                    formErrors.lastName ? 'border-red-500' : 'border-[#1b1ba3]'
                  }`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`border-2 rounded-lg w-full h-10 px-4 focus:outline-none focus:border-blue-500 ${
                  formErrors.email ? 'border-red-500' : 'border-[#1b1ba3]'
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+233 XXX XXX XXX"
                className={`border-2 rounded-lg w-full h-10 px-4 focus:outline-none focus:border-blue-500 ${
                  formErrors.phone ? 'border-red-500' : 'border-[#1b1ba3]'
                }`}
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`border-2 rounded-lg h-10 w-full px-4 pr-12 focus:outline-none focus:border-blue-500 ${
                  formErrors.password ? 'border-red-500' : 'border-[#1b1ba3]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 transform text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaRegEye size={16} /> : <FaRegEyeSlash size={16} />}
              </button>
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#1b1ba3] text-white font-bold rounded-lg h-10 w-full cursor-pointer hover:bg-blue-800 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex gap-1 mt-4 text-sm">
            <span>Already have an account?</span>
            <Link to={'/jlogin'} className="text-[#0000FF] hover:underline">
              Log In
            </Link>
          </div>

          <ul className="flex gap-4 font-medium mt-4 justify-center text-sm">
            <span className="text-[#0000FF] border-b-2 border-blue-500">Job Seeker</span>
            <span>|</span>
            <Link to={'/esignup'} className="hover:text-[#1b1ba3] transition-colors">
              Employer
            </Link>
            <span>|</span>
            <Link to={'/asignup'} className="hover:text-[#1b1ba3] transition-colors">
              Admin
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JsignUp;