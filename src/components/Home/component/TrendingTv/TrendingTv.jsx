
import React, { useEffect, useState } from 'react'
import styles from './TrendingTv.module.css'

import ShareSection from '../../../ShareSection/ShareSection';


export default function TrendingTv() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <>
      <div className="mt-7 container mx-auto p-2">
        <h1 className='text-white font-bold text-2xl mb-1 md:ms-2 ms-2 '>Trending <span className='text-red-700'>Tv</span></h1>
      </div>
      <ShareSection ApiUrl={`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}
`} />
    </>
  )
}
