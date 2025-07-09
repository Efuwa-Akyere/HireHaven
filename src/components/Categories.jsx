import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiFamilyHouse } from "react-icons/gi";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Categories = () => {
  return (
    <section className="bg-[#E7EAFC] pt-[5rem] pb-[1rem] h-full">
      <div className="flex flex-col   justify-center items-center">
        <h2 className="text-3xl font-bold pb-3 ">Choose Your Desire Category</h2>
        <p className="text-lg text-gray-600 ">
          Discover job categories tailored to your strengths. Select the field
          that aligns 
        </p>
        <p className="text-lg text-gray-600">with your passion and start exploring the right
          opportunities.</p>
      </div>
      <div className="bg-white m-16 grid grid-cols-3 p-8 py-16 gap-x-5 gap-y-16">
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <IoSettingsOutline size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">Techincal Support</p>
        </div>
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <FaGraduationCap  size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">Education</p>
        </div>
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <FaLaptopCode size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">IT & Network Services</p>
        </div>
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <BsGraphUpArrow size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">Bussiness Development</p>
        </div>
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <GiFamilyHouse size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">Real Estate</p>
        </div>
        <div
          className="border-1 border-gray-300 p-3 h-[15rem] w-[23rem] flex flex-col gap-4 justify-center items-center
        rounded-lg shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center">
            <GiForkKnifeSpoon size={60} className="text-[#0000FF] " />
          </div>
          <p className="font-bold">Restaurant Services</p>
        </div>
      </div>
    </section>
  );
};

export default Categories;
