import React, {useEffect, useState } from 'react'
import logo from '../../assets/images/raf_360x360_075_t_fafafa_ca443f4786-removebg-preview.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation'
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';

export default function NavBar() {
  let [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <nav className=" bg-black/65  fixed right-0 top-0 left-0 z-50  rounded-full  border-[#464747]  ">
        <div className="container mx-auto flex flex-wrap items-center justify-between  p-4">
          <Link to={'home'} className="flex items-center ">
            <img src={logo} className="h-12 w-28 rounded-full" alt="Flowbite Logo" />
            <TypeAnimation
              sequence={[
                'D',
                500,
                'Devil`s',
                500,
                'Devil`s',
                () => {
                  console.log('Sequence completed');
                },
              ]}
              wrapper="span"

              className='text-red-600'
              cursor={false}
              repeat={5}
              deletionSpeed={200}
              speed={180}

              style={{ fontSize: '1.8rem', display: 'inline-block', fontWeight: 'bold' }}
            />
          </Link>

          <div className="hidden w-full md:block md:w-auto  " >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <NavLink to={"home"} className="block py-2 px-3  rounded-sm md:bg-transparent text-red-700 md:p-0">Home</NavLink>
              </li>
              <li>
                <NavLink to={'movies'} className="block py-2 px-3 rounded-sm  md:border-0  md:p-0 text-red-700">Movies</NavLink>
              </li>
              <li>
                <NavLink to={'tv'} className="block py-2 px-3  rounded-sm  m md:border-0  md:p-0 text-red-700">Tv Show</NavLink>
              </li>
              <li>
                <NavLink to={'animeCartoon'} className="block py-2 px-3  rounded-sm  m md:border-0  md:p-0 text-red-700">Anime</NavLink>
              </li>
              <li>
                <Link to={'search'} className='cursor-pointer'><svg className="w-5 h-5 text-white" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </Link>
              </li>
              <li>
                <Link to={'/favourites'} className='cursor-pointer'><IoHeartOutline  className="w-6 h-6 text-white " /></Link>
                
              </li>
            </ul>
          </div>

          <div className="md:hidden relative flex ">
            <li>
                <Link to={'/favourites'} className='cursor-pointer'><IoHeartOutline  className="w-8 md:h-7 h-6 md:mt-2 mt-1 me-2 text-white " /></Link>
                
              </li>
            <button onBlur={()=>setOpenMenu(false)} onClick={() => setOpenMenu(prev => !prev)}>
               <FaBars className="cursor-pointer text-white mt-1" size={22} />
               
            </button>
            
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "steps" }}
                  className='absolute right-1 w-34.5 mx-auto z-50'
                >
                  <ul className="font-medium bg-[#070707] p-3 mt-4 rounded-lg">
                    <li>
                      <NavLink to={"home"} className="block py-2 px-6 rounded-sm text-red-700">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to={'movies'} className="block py-2 px-6 rounded-sm text-red-700">Movies</NavLink>
                    </li>
                    <li>
                      <NavLink to={"tv"} className="block py-2 px-6 rounded-sm text-red-700">Tv Show</NavLink>
                    </li>
                    <li>
                      <NavLink to={'animeCartoon'} className="block py-2 px-6  rounded-sm  m md:border-0  md:p-0 text-red-700">Anime </NavLink>
                    </li>
                    
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  )
}
