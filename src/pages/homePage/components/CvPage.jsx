import React from "react";
import InterviewPic from "../../../assets/images/InterviewPic.jpg";
import { AiOutlineUpload } from "react-icons/ai";

const CvPage = () => {
  return (
    <section>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${InterviewPic})` }}
      >
        <div className="absolute inset-0 bg-[#0000FF]/35"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4 md:px-20">
          <div className="text-2xl md:text-4xl font-semibold mb-16 max-w-3xl">
            <h2>Don't just find. Be found. Put your </h2>
            <h2>CV in front of great employers</h2>
          </div>

          <div className="text-base md:text-xl mb-16 max-w-2xl text-white/90">
            <h2>
              It helps you increase your chances of finding a suitable job and
              lets recruiters contact you
            </h2>
            <h2>about jobs that don't even need to be advertised.</h2>
          </div>

          <div className="flex gap-2 items-center justify-center bg-white text-[#0000FF] px-6 py-2 rounded-md font-semibold hover:bg-black hover:text-white transition">
            <AiOutlineUpload size={22} />
            <button>Upload CV</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CvPage;
