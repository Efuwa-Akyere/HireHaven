import React from "react";
import { TbCircleDotted } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { TbCalendarSearch } from "react-icons/tb";

const AfterLandingPage = () => {
  return (
    <section className="bg-[#2042E3]  text-white px-6 py-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Register Account */}
      <div className="flex gap-4">
        <div className="relative w-24 h-24 min-w-24">
          <TbCircleDotted className="w-full h-full text-white opacity-30" />
          <FaUserAlt className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-bold text-xl">Register your account</p>
          <p>
            Register now to start applying for jobs, connect with hiring managers, and grow your professional profile.
          </p>
        </div>
      </div>

      {/* Upload CV */}
      <div className="flex gap-4">
        <div className="relative w-24 h-24 min-w-24">
          <TbCircleDotted className="w-full h-full text-white opacity-30" />
          <GrDocumentUpdate className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-bold text-xl">Upload your CV</p>
          <p>
            Help employers discover your skills, experience, and potential.
          </p>
        </div>
      </div>

      {/* Apply for Jobs */}
      <div className="flex gap-4">
        <div className="relative w-24 h-24 min-w-24">
          <TbCircleDotted className="w-full h-full text-white opacity-30" />
          <TbCalendarSearch className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p className="font-bold text-xl">Apply for your dream job</p>
          <p>
            Explore exciting opportunities, apply with confidence, and step into the career you've always imagined.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AfterLandingPage;
