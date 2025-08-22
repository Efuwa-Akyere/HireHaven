import Pic1 from "../../../assets/images/HeadShot2.jpg";
import Pic2 from "../../../assets/images/HeadShot3.jpg";
import { BiCategory } from "react-icons/bi";
import Pic3 from '../../../assets/images/WedoPic1.jpg'
import { FaSearch } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const WhatWeDo = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-16 lg:gap-x-16 px-6 lg:mx-16 my-12">
      
      <div className="flex flex-col ">
        <div className="flex gap-4 sm:gap-6 justify-center">
          <img
            src={Pic3}
            alt=""
            className="rounded-xl h-[14rem] w-[10rem] sm:h-[21rem] sm:w-[15rem] object-contain"
          />
          <img
            src={Pic2}
            alt=""
            className="rounded-xl h-[14rem] w-[10rem] sm:h-[21rem] sm:w-[15rem] mt-8 sm:mt-16 object-contain"
          />
        </div>

        <div className="flex gap-4 sm:gap-6 justify-center">
          <img
            src={Pic1}
            alt=""
            className="rounded-xl h-[14rem] w-[10rem] sm:h-[21rem] sm:w-[15rem] -mt-6 sm:-mt-10 object-contain"
          />
          <div className="relative flex items-center justify-center rounded-xl h-[10rem] w-[10rem] sm:h-[15rem] sm:w-[15rem] mt-4 sm:mt-6">
            <div className="absolute inset-0 bg-blue-700/90 rounded-xl"></div>
            <div className="relative z-10 px-3 sm:px-6 text-white flex flex-col  text-center">
              <p className="text-lg sm:text-2xl font-bold">Job Alert!</p>
              <p className="text-sm sm:text-base">104 new jobs are</p>
              <p className="text-sm sm:text-base">available this week!</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col items-center  gap-y-10 mt-12 lg:mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center ">
        Help You To Get The <br />Best Job That Fits You
        </h1>

        <div className="flex flex-col gap-y-8 sm:gap-y-12">
          <div className="flex gap-x-4 sm:gap-x-5">
            <div className="bg-blue-100 h-14 w-16 sm:h-16 sm:w-20 rounded-lg flex items-center justify-center text-blue-700">
              <BiCategory size={20} />
            </div>
            <div>
              <p className="font-bold text-lg sm:text-xl">#1 Jobs site in Ghana</p>
              <p className="text-sm sm:text-base">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 sm:gap-x-5">
            <div className="bg-blue-100 h-14 w-16 sm:h-16 sm:w-20 rounded-lg flex items-center justify-center text-blue-700">
              <FaSearch size={20} />
            </div>
            <div>
              <p className="font-bold text-lg sm:text-xl">Seamless searching</p>
              <p className="text-sm sm:text-base">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative
              </p>
            </div>
          </div>

          <div className="flex gap-x-4 sm:gap-x-5">
            <div className="bg-blue-100 h-14 w-16 sm:h-16 sm:w-20 rounded-lg flex items-center justify-center text-blue-700">
              <BsGraphUpArrow size={20} />
            </div>
            <div>
              <p className="font-bold text-lg sm:text-xl">Hired in top companies</p>
              <p className="text-sm sm:text-base">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
