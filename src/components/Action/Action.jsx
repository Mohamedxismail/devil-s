
import React, { useEffect, useState } from 'react'
import MoviesShared from '../MoviesShared/MoviesShared'

export default function Action() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY

  return (
    <>
    <helmet><title> Action Movies  </title></helmet>
      <MoviesShared apiUrl={`https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=${API_KEY}`} />
    </>
  )
}
