import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 fixed top-0 z-50">
      <div className="flex justify-between items-center">
        
        <div>
          <p className="font-medium text-xl">
            HIRE
            <span className="text-[#0000FF] font-bold">HAVEN</span>
          </p>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 items-center">
          <Link to={'/'} className="cursor-pointer hover:text-[#0000FF]">Home</Link>
          <Link to={'about'} className="cursor-pointer hover:text-[#0000FF]">About Us</Link>
          <Link to={'/contactus'} className="cursor-pointer hover:text-[#0000FF]">Contact</Link>          
        </ul>

        {/* Auth Links */}
        <ul className="hidden md:flex gap-3 items-center text-sm">
          <Link to={'jsignup'} className="cursor-pointer hover:text-[#0000FF]">Sign Up</Link>
          <span>|</span>
          <Link to={'jlogin'} className="cursor-pointer hover:text-[#0000FF]">Login</Link>
        </ul>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden text-sm">
          <ul className="flex flex-col gap-3">
            <li className="cursor-pointer hover:text-[#0000FF]">Home</li>
            <li className="cursor-pointer hover:text-[#0000FF]">About Us</li>
            <li className="cursor-pointer hover:text-[#0000FF]">Contact</li>
          </ul>
          <div className="flex gap-3">
            <Link to={'jsignup'}className="cursor-pointer hover:text-[#0000FF]">Sign Up</Link>
            <span>|</span>
            <Link to={'jlogin'} className="cursor-pointer hover:text-[#0000FF]">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
