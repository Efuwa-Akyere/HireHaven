import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import HeadShot1 from '../../../assets/images/HeadShot1.png'
import HeadShot2 from '../../../assets/images/HeadShot2.jpg'
import HeadShot3 from '../../../assets/images/HeadShot3.jpg'

const Applicants = () => {
  return (
    <main className='mt-12 px-4 sm:px-6 md:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
        <motion.div  
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-full sm:max-w-[25.5rem] h-auto sm:h-[15rem] bg-white px-4 sm:px-6 py-6 rounded-lg shadow mx-2"
        >
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-10 items-center justify-center'>
              <div>
                <img className='h-14' src={HeadShot1} alt="" />
              </div>
              <div className='font-semibold'>
                <p>Angela Amoako</p>
                <p>Abokobi, Ghana</p>
              </div>
            </div>
            <div className='text-gray-300'><hr /></div>
            <div className='flex flex-col gap-y-1'>
              <div className='flex gap-4 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Skills</p>
                <p className='text-gray-500'>CSS, HTML, JAVASCRIPT, REACT</p>
              </div>
              <div className='flex gap-6 sm:gap-8 md:gap-20'>
                <p className='font-semibold text-lg'>Contact</p>
                <p className='text-gray-500'>0243378568</p>
              </div>
              <div className='flex gap-11 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Email</p>
                <Link className='text-blue-700'>ange123@gmail.com</Link>
              </div>
              <div className='flex gap-4 sm:gap-8 md:gap-[4.5rem]'>
                <p className='font-semibold text-lg'>LinkedIn</p>
                <Link className='text-blue-700'>https://www.linkedin.com</Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div  
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-full sm:max-w-[25.5rem] h-auto sm:h-[15rem] bg-white px-4 sm:px-6 py-6 rounded-lg shadow mx-2"
        >
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-10 items-center justify-center'>
              <div>
                <img className='h-14 rounded-full' src={HeadShot2} alt="" />
              </div>
              <div className='font-semibold'>
                <p>Daniel Mensah</p>
                <p>Kasoa, Ghana</p>
              </div>
            </div>
            <div className='text-gray-300'><hr /></div>
            <div className='flex flex-col gap-y-1'>
              <div className='flex gap-4 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Skills</p>
                <p className='text-gray-500'>CSS, HTML, JAVASCRIPT, REACT</p>
              </div>
              <div className='flex gap-6 sm:gap-8 md:gap-20'>
                <p className='font-semibold text-lg'>Contact</p>
                <p className='text-gray-500'>0243378568</p>
              </div>
              <div className='flex gap-11 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Email</p>
                <Link className='text-blue-700'>ange123@gmail.com</Link>
              </div>
              <div className='flex gap-4 sm:gap-8 md:gap-[4.5rem]'>
                <p className='font-semibold text-lg'>LinkedIn</p>
                <Link className='text-blue-700'>https://www.linkedin.com</Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div  
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-full sm:max-w-[25.5rem] h-auto sm:h-[15rem] bg-white px-4 sm:px-6 py-6 rounded-lg shadow mx-2"
        >
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-10 items-center justify-center'>
              <div>
                <img className='h-14 w-14 rounded-full' src={HeadShot3} alt="" />
              </div>
              <div className='font-semibold'>
                <p>Praise Ike</p>
                <p>Lagos, Nigeria</p>
              </div>
            </div>
            <div className='text-gray-300'><hr /></div>
            <div className='flex flex-col gap-y-1'>
              <div className='flex gap-4 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Skills</p>
                <p className='text-gray-500'>CSS, HTML, JAVASCRIPT, REACT</p>
              </div>
              <div className='flex gap-6 sm:gap-8 md:gap-20'>
                <p className='font-semibold text-lg'>Contact</p>
                <p className='text-gray-500'>0243378568</p>
              </div>
              <div className='flex gap-11 sm:gap-10 md:gap-24'>
                <p className='font-semibold text-lg'>Email</p>
                <Link className='text-blue-700'>ange123@gmail.com</Link>
              </div>
              <div className='flex gap-4 sm:gap-8 md:gap-[4.5rem]'>
                <p className='font-semibold text-lg'>LinkedIn</p>
                <Link className='text-blue-700'>https://www.linkedin.com</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default Applicants
