import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import error from '../../assets/images/x1sr1lob3ai41-CAx-tWTb.webp'
export default function NotFound() {

  return (
    <div className=' container mx-auto md:pt-0  pt-6'>
      <img className='w-full h-160' src={error} />
    </div>
  )
}
