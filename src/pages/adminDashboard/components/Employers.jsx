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
     className="overflow-x-auto mt-6 w-[100%]">
  <table className="table bg-white">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Job/Role</th>
        <th>Location</th>
        <th>Status</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" h-16 w-36">
                <img
                  src={Div}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          Developers in Vogue
          <br />
          <span className="badge badge-ghost badge-sm bg-blue-100 text-[#0000FF]">Digital Marketer</span>
        </td>
        <td>Dworwulu, Ghana</td>
        <th>
          <td className="text-[#0000FF]">Full Time</td>
        </th>
        <th>
          <td className=''>IT & Network Services</td>
        </th>
        <th>
          <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
        </th>
      </tr>
      {/* row 2 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" h-16 w-36">
                <img
                  src={absa}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          Absa Bank
          <br />
          <span className="badge badge-ghost badge-sm bg-blue-100 text-[#0000FF]">Human Resource</span>
        </td>
        <td>Ring Road, Ghana</td>
        <th>
          <td className="text-[#0000FF]">Full Time</td>
        </th>
        <th>
          <td className=''>Bussiness Development</td>
        </th>
        <th>
          <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
        </th>
      </tr>
      {/* row 3 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" h-16 w-36">
                <img
                  src={Special}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          Special Gardens
          <br />
          <span className="badge badge-ghost badge-sm bg-blue-100 text-[#0000FF]">Tour Guide</span>
        </td>
        <td>Adenta- Aburi Highway <br /> Ghana</td>
        <th>
          <td className="text-[#0000FF]">Part Time</td>
        </th>
        <th>
          <td className=''>Real Estate</td>
        </th>
        <th>
          <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
        </th>
      </tr>
      {/* row 4 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" h-16 w-36">
                <img
                  src={Res}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          Nsuomnam Restaurant
          <br />
          <span className="badge badge-ghost badge-sm bg-blue-100 text-[#0000FF]">Chef</span>
        </td>
        <td>10 Josif Broz Tito Ave, Accra</td>
        <th>
          <td className="text-[#0000FF]">Full Time</td>
        </th>
        <th>
          <td className=''>Restaurant Services</td>
        </th>
        <th>
          <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
        </th>
      </tr>

      {/* row 5 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className=" h-16 w-36">
                <img
                  src={GIS}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          Ghana International School
          <br />
          <span className="badge badge-ghost badge-sm bg-blue-100 text-[#0000FF]">Chemistry Teacher</span>
        </td>
        <td>2nd Circular Road, Cantonments</td>
        <th>
          <td className="text-[#0000FF]">Full Time</td>
        </th>
        <th>
          <td className=''>Education</td>
        </th>
        <th>
          <button className='text-red-600 text-xl cursor-pointer'><FaRegTrashCan /></button>
        </th>
      </tr>
    </tbody>
    {/* foot */}
    
  </table>
</motion.div>
  )
}

export default Employers