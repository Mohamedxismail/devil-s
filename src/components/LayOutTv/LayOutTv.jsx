import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './LayOutTv.module.css'
import { NavLink } from 'react-router-dom'

export default function LayOutTv() {
  let [open, setOpen] = useState(false)
  return (
    <>
      <div className="container mx-auto flex justify-between items-center md:mb-5 mb-2 mt-6">
        <h1 className='md:text-2xl text-xl text-white md:ps-1 ps-2'>Popular <span className='text-red-600'>Tv</span></h1>

        <div className='md:hidden absolute right-0'>
          <button onClick={() => setOpen(prev => !prev)} className="flex cursor-pointer items-center justify-center text-white shadow-xs font-medium leading-5 rounded-base text-xl" type="button">
            Genere <svg className="w-6 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
            </svg>

          </button>
          {open && <div className="z-50 absolute right-3 ms-10 shadow-lg w-39">
            <ul className="font-medium bg-[#000000] p-3 mt-4  rounded-lg">
              <li>
                <NavLink to={"actionTv"} className="block py-2 px-9 rounded-sm text-red-700">Action</NavLink>
              </li>
              <li>
                <NavLink to={'comedyTv'} className="block py-2 px-9 rounded-sm text-red-700">Comedy</NavLink>
              </li>
              <li>
                <NavLink to={"dramaTv"} className="block py-2 px-9 rounded-sm text-red-700">Drama</NavLink>
              </li>

            </ul>
          </div>}
        </div>
        <div className="shadow-lg ">
          <ul className="font-medium md:flex hidden gap-3">
            <li>
              <NavLink to={"actionTv"} className=" rounded-sm text-red-700">Action</NavLink>
            </li>
            <li>
              <NavLink to={"comedyTv"} className=" rounded-sm text-red-700 ">Comedy</NavLink>
            </li>
            <li>
              <NavLink to={"dramaTv"} className="rounded-sm text-red-700">Drama</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </>
  )
}
