import React, { useEffect, useState } from 'react'
import styles from './TopRatedTv.module.css'
import ShareSection from '../../../ShareSection/ShareSection';

export default function TopRatedTv() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <>
      <div className='mt-7 container mx-auto p-2   '>
        <h1 className='text-white font-bold text-2xl mb-1 md:ms-2 ms-2'>Top Rated <span className='text-red-700'>Tv</span></h1>
      </div>
      <div className="md:mb-2 mb-20">
        <ShareSection ApiUrl={`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1
`} />
      </div>
    </>
  )
}
