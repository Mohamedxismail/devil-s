import React, { useEffect, useState } from 'react'
import styles from './NowPlaying.module.css'
import ShareSection from '../../../ShareSection/ShareSection';


export default function NowPlaying() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <>
      <div className='mt-7 container mx-auto p-2 '>
        <h1 className='text-white font-bold text-2xl mb-1 md:ms-2 ms-2'><span className='text-red-700'>Movies</span> Playing Now </h1>
      </div>

      <ShareSection ApiUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1
`} />

    </>
  )
}
