import React, { useEffect, useState } from 'react'
import styles from './PopularMovies.module.css'
import MoviesShared from '../../../MoviesShared/MoviesShared';

export default function PopularMovies() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <>
      <MoviesShared apiUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`} />
    </>
  )
}
