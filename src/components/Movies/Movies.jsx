import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Movies.module.css'
import PopularMovies from './component/PopularMovies/PopularMovies'
import { NavLink, Outlet } from 'react-router-dom'
import LayOutMovies from '../LayOutMovies/LayOutMovies'

export default function Movies() {
  
    
  
  return (
    <div className='container mx-auto pt-20'>
       <LayOutMovies/>
      <Outlet/>
    </div>
  )
}
