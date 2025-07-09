import React from "react";
import LandingPic1 from "../assets/images/LandingPic1.jpg";

const LandingPage = () => {
  return (
    <section>
      <div
        className="bg-cover bg-center h-screen relative"
        style={{ backgroundImage: `url(${LandingPic1})` }}
      >
        <div
          className="absolute inset-
     bg-black/45 inset-0 "
        ></div>
        <div className="absolute text-white top-60 right-80 text-5xl">
          <p className="text-[#0000FF] font-bold">
            100+{" "}
            <span className="text-white font-medium">
              Jobs posted last week
            </span>
          </p>
        </div>
        <div className="absolute bg-[#387DD7]/55 p-5 w-full bottom-40">
          <div className="flex gap-10 items-center justify-center">
            <div className="bg-white p-2">What are you looking for?</div>
            <div className="bg-white p-2 flex gap-20 ">
              <div>
                <p>Select category</p>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1.5em"
                  height="1.3em"
                >
                  <path
                    fill="currentColor"
                    d="M11.18 15.83L6.543 9.203C5.892 8.275 6.556 7 7.689 7h8.622c1.133 0 1.797 1.275 1.147 2.203l-4.639 6.627a1 1 0 0 1-1.638 0"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="bg-white p-2 flex gap-32">
              <div>
                <p>Search</p>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    d="m15.504 13.616l-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="bg-[#1212C2] text-white w-40 h-10 flex items-center justify-center rounded-xl cursor-pointer font-bold ml-[10rem]">
              <button className="cursor-pointer">Post a job</button>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default LandingPage;
