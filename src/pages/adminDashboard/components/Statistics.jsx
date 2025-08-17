import { FaBriefcase } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import {motion} from 'framer-motion'

const Statistics = () => {
  return (
   <div className="mt-12 w-full flex justify-center px-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="card bg-base-100 w-72 shadow-sm"
        >
          <div className="card-body flex flex-col gap-y-8">
            <div className="flex">
              <p className="text-xl font-medium">Total Employers</p>
              <FaBriefcase className="text-2xl text-blue-900" />
            </div>
            <div className="flex text-center">
              <p className="text-3xl font-bold text-[#0000FF]">0</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="card bg-base-100 w-72 shadow-sm"
        >
          <div className="card-body flex flex-col gap-y-8">
            <div className="flex">
              <p className="text-xl font-medium">Total Job Seekers</p>
              <FaUserTie className="text-2xl text-blue-900" />
            </div>
            <div className="flex text-center">
              <p className="text-3xl font-bold text-[#0000FF]">0</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="card bg-base-100 w-72 shadow-sm"
        >
          <div className="card-body flex flex-col gap-y-8">
            <div className="flex">
              <p className="text-xl font-medium">Total Categories</p>
              <TbCategoryFilled className="text-2xl text-blue-900" />
            </div>
            <div className="flex text-center">
              <p className="text-3xl font-bold text-[#0000FF]">6</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="card bg-base-100 w-72 shadow-sm"
        >
          <div className="card-body flex flex-col gap-y-8">
            <div className="flex">
              <p className="text-xl font-medium">Growth</p>
              <FaArrowTrendUp className="text-2xl text-blue-900" />
            </div>
            <div className="flex text-center">
              <p className="text-3xl font-bold text-[#0000FF]">0%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

  );
};

export default Statistics;
