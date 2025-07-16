import { FaFacebook, FaInstagram, FaTwitter, FaRegCopyright } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <section className="p-6 sm:p-12 bg-[#0000FF] text-white">
      <div className="grid gap-10 md:grid-cols-3">
        
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium">
            HIRE<span className="text-2xl font-bold">HAVEN</span>
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            HireHaven is a modern job portal dedicated to connecting skilled professionals with employers who value talent. Our mission is to simplify the hiring process and empower people to find meaningful work.
          </p>
        </div>

        
        <div className="flex flex-col items-start md:items-center gap-4">
          <p className="text-xl font-medium">Socials</p>
          <div className="flex flex-col gap-4">
            <FaFacebook size={20} />
            <FaInstagram size={20} />
            <FaTwitter size={20} />
          </div>
        </div>

        
        <div className="flex flex-col gap-4 items-start md:items-center">
          <p className="text-xl font-medium">Contact</p>
          <div className="flex flex-col gap-3 text-sm sm:text-base">
            <div className="flex gap-2 items-center">
              <IoGlobeOutline size={20} />
              <p>www.hirehaven.org</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationDot size={20} />
              <p>Dworwulu, Accra. Ghana</p>
            </div>
            <div className="flex gap-2 items-center">
              <IoMdMail size={20} />
              <p>hirehaven@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white mt-10" />

      <div className="flex  sm:flex-row justify-center items-center gap-2 text-sm mt-4">
        <FaRegCopyright />
        <p>2025. All rights reserved</p>
      </div>
    </section>
  );
};

export default Footer;
