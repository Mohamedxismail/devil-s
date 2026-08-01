import React, { useEffect, useState } from 'react'
import styles from './DramaTv.module.css'
import TvShared from '../TvShared/TvShared'

export default function DramaTv() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <TvShared apiUrl={`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18`} />
  )
}
