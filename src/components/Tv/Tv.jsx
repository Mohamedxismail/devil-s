import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Tv.module.css'
import PopularTv from './component/PopularTv/PopularTv'
import LayOutTv from '../LayOutTv/LayOutTv'
import { Outlet } from 'react-router-dom'

export default function Tv() {
    
  return (
    <div className='pt-20 container mx-auto'>
      <LayOutTv/>
          <Outlet/>
        </div>
  )
}
