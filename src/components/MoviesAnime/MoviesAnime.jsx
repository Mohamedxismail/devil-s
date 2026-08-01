import React, { useEffect, useState } from 'react'
import styles from './MoviesAnime.module.css'
import MoviesShared from '../MoviesShared/MoviesShared';
export default function MoviesAnime() {

  const API_KEY = import.meta.env.VITE_TMDB_KEY
  return (
    <>
      <div className="md:pt-5 pt-3">
        <MoviesShared apiUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`} />

      </div>
    </>
  )
}
