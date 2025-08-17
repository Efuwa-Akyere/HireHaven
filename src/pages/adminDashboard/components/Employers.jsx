import Div from '../../../assets/images/Div.jpg'
import absa from '../../../assets/images/absa.png'
import Special from '../../../assets/images/Special.png'
import Res from '../../../assets/images/Res.jpg'
import GIS from '../../../assets/images/GIS.png'
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from 'framer-motion';

const Employers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto mt-6 w-full"
    >
      <table className="table bg-white w-full text-sm sm:text-base">
        <thead className="bg-white">
          <tr>
            <th>Name</th>
            <th>Job/Role</th>
            <th>Location</th>
            <th>Status</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-16 w-36">
                    <img src={Div} alt="Developers in Vogue" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              Developers in Vogue
              <br />
              <span className="badge badge-ghost bg-blue-100 text-[#0000FF] mt-1 px-2 py-5 text-xs sm:text-sm whitespace-normal">
                Digital Marketer
              </span>
            </td>
            <td>Dworwulu, Ghana</td>
            <td className="text-[#0000FF]">Full Time</td>
            <td>IT & Network Services</td>
            <td>
              <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
            </td>
          </tr>

          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-16 w-36">
                    <img src={absa} alt="Absa Bank" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              Absa Bank
              <br />
              <span className="badge badge-ghost bg-blue-100 text-[#0000FF] mt-1 px-2 py-5 text-xs sm:text-sm whitespace-normal">
                Human Resource
              </span>
            </td>
            <td>Ring Road, Ghana</td>
            <td className="text-[#0000FF]">Full Time</td>
            <td>Business Development</td>
            <td>
              <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
            </td>
          </tr>

          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-16 w-36">
                    <img src={Special} alt="Special Gardens" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              Special Gardens
              <br />
              <span className="badge badge-ghost bg-blue-100 text-[#0000FF] mt-1 px-2 py-5 text-xs sm:text-sm whitespace-normal">
                Tour Guide
              </span>
            </td>
            <td>Adenta- Aburi Highway <br /> Ghana</td>
            <td className="text-[#0000FF]">Part Time</td>
            <td>Real Estate</td>
            <td>
              <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
            </td>
          </tr>

          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-16 w-36">
                    <img src={Res} alt="Nsuomnam Restaurant" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              Nsuomnam Restaurant
              <br />
              <span className="badge badge-ghost bg-blue-100 text-[#0000FF] mt-1 px-2 py-5 text-xs sm:text-sm whitespace-normal">
                Chef
              </span>
            </td>
            <td>10 Josif Broz Tito Ave, Accra</td>
            <td className="text-[#0000FF]">Full Time</td>
            <td>Restaurant Services</td>
            <td>
              <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
            </td>
          </tr>

          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-16 w-36">
                    <img src={GIS} alt="Ghana International School" className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              Ghana International School
              <br />
              <span className="badge badge-ghost bg-blue-100 text-[#0000FF] mt-1 px-2 py-5 text-xs sm:text-sm whitespace-normal">
                Chemistry Teacher
              </span>
            </td>
            <td>2nd Circular Road, Cantonments</td>
            <td className="text-[#0000FF]">Full Time</td>
            <td>Education</td>
            <td>
              <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  )
}

export default Employers
