import { NavLink } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const Sidebar = () => {
  const {admin, adminLogout} = useContext(AdminAuthContext);


  return (
    <div className='drawer lg:drawer-open min-h '>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden self-start m-4"
        >
         <IoMdMenu className="text-2xl"/>
        </label>
      </div>
      <div className="drawer-side  ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay w-[22rem]"
        ></label>
        <ul className='menu text-base-content min-h-full w-80 p-4 gap-y-5 bg-base-100 '>
          {/* Sidebar content here */}
          <li>
            <div>
          <p className="font-medium text-sm ">
            HIRE
            <span className="text-[#0000FF] text-xl font-bold">HAVEN</span>
          </p>
        </div>
          </li>
          <li>
            <NavLink
              to={"applicants"}
              className={({ isActive }) =>
                isActive ? "bg-blue-900 text-white" : "text-[#0000FF]"
              }
            >
              <div className="flex gap-2">
                <BsFillPeopleFill size={20}/>
                <p className="self-center font-medium">Applicants</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"employers"}
              className={({ isActive }) =>
                isActive ? "bg-blue-900 text-white" : "text-[#0000FF]"
              }
            >
             <div className="flex gap-2">
                <FaPeopleGroup size={20}/>
                <p className="self-center font-medium">Employers</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"statistics"}
              className={({ isActive }) =>
                isActive ? "bg-blue-900 text-white" : "text-[#0000FF]"
              }
            >
             <div className="flex gap-2">
                <VscGraph size={20}/>
                <p className="self-center font-medium">Statistics</p>
              </div>
            </NavLink>
          </li>
          <li>
  <button onClick={adminLogout} className="flex gap-2 text-[#0000FF]">
    <TbLogout2 size={20}/>
    <p className="self-center font-medium">LogOut</p>
  </button>
</li>

        </ul>
      </div>
    </div>
  )
}

export default Sidebar