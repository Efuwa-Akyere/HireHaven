import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiFamilyHouse, GiForkKnifeSpoon } from "react-icons/gi";

const Categories = () => {
  return (
    <section className="bg-[#E7EAFC] pt-[5rem] pb-[1rem]">
      <div className="flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-bold pb-3">
          Choose Your Desire Category
        </h2>
        <p className="text-lg text-gray-600">
          Discover job categories tailored to your strengths. Select the field
          that aligns
        </p>
        <p className="text-lg text-gray-600">
          with your passion and start exploring the right opportunities.
        </p>
      </div>

      <div className="bg-white m-4 md:m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10">
        {[
          { icon: <IoSettingsOutline size={60} />, title: "Technical Support" },
          { icon: <FaGraduationCap size={60} />, title: "Education" },
          { icon: <FaLaptopCode size={60} />, title: "IT & Network Services" },
          { icon: <BsGraphUpArrow size={60} />, title: "Business Development" },
          { icon: <GiFamilyHouse size={60} />, title: "Real Estate" },
          { icon: <GiForkKnifeSpoon size={60} />, title: "Restaurant Services" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 p-6 h-[15rem] w-full max-w-sm mx-auto flex flex-col gap-4 justify-center items-center rounded-lg shadow-lg outline outline-black/5 hover:shadow-xl transform hover:scale-105 transition duration-300 bg-white"
          >
            <div className="bg-[#E7EAFC] h-[7rem] w-[11rem] flex justify-center items-center text-[#0000FF]">
              {item.icon}
            </div>
            <p className="font-bold">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
