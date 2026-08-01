import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'
import { FadeLoader } from 'react-spinners'

export default function Loader() {
    
  return (
    <div className=' flex justify-center items-center mt-40'>
      <FadeLoader
  color="#e91515"
  height={14}
  margin={5}
  radius={6}
  width={6}
/>
    </div>
  )
}
