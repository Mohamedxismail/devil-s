import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import { Link, NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export default function Footer() {

  return (
    <>
      <div className=' bg-[#0a0a0a] fixed bottom-0 left-0 right-0 z-50  md:hidden p-3 '>
        <div className="flex items-center justify-between ">
          <NavLink className='flex-col text-center  text-[#a3a3a3]' to={'/home'}> <div className="flex-col justify-center items-center text-center">
            <div className='text-center' >
              <FaHome className='text-2xl ms-2' />
              <span>Home</span>
            </div>
            
          </div></NavLink>
         <NavLink className='flex-col text-center text-[#a3a3a3]' to={'/tv'}><div className="flex-col text-center">
            <div className="text-center ms-4">
              <svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 256 256" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M216,64H147.31l34.35-34.34a8,8,0,1,0-11.32-11.32L128,60.69,85.66,18.34A8,8,0,0,0,74.34,29.66L108.69,64H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,136H160V80h56V200Zm-16-84a12,12,0,1,1-12-12A12,12,0,0,1,200,116Zm0,48a12,12,0,1,1-12-12A12,12,0,0,1,200,164Z"></path></svg>
            </div>
            <span className=' text-center'> Tv Show</span>
          </div></NavLink>
         <NavLink  className='flex-col text-center text-[#a3a3a3]' to={'movies'}> <div className="flex-col text-center">
            <div className="text-center ms-3">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z"></path></svg>
            </div>
            <span className='text-[#a3a3a3] text-center'>Movies</span>
          </div></NavLink>
         <NavLink  className='flex-col text-center text-[#a3a3a3]' to={'search'}> <div className="flex-col text-center justify-center items-center">
            <div>
              <svg className="ms-2" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>

            </div>
            <span>Search</span>
          </div></NavLink>
          

        </div>

      </div>

    </>
  )
}
