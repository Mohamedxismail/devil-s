import React, { useEffect, useState } from 'react'
import styles from './Comedy.module.css'
import MoviesShared from '../MoviesShared/MoviesShared'

export default function Comedy() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY

  return (
    <>
      <MoviesShared apiUrl={`https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=popularity.desc&api_key=${API_KEY}`} />
    </>
  )
}
