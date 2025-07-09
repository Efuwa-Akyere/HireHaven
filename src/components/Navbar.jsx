import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between  h-[3.5rem] items-center p-[2rem] ">
      <div className="">
        <p className="font-medium">HIRE<span className="text-[#0000FF] text-xl font-bold">HAVEN</span></p>
      </div>

      <div className="">
        <ul className="flex gap-20 ">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <p>Sign Up</p>
        <p className="">|</p>
        <p>Login</p>
      </div>
    </nav>
  );
};

export default Navbar;
