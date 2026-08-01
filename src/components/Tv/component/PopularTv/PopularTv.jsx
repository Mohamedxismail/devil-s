import React, { useEffect, useState } from 'react'
import styles from './PopularTv.module.css'
import TvShared from '../../../TvShared/TvShared';
export default function PopularTv() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY

  return (
    <>
      <TvShared apiUrl={`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`} />
    </>
  )
}
