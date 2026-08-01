import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './TrailerTv.module.css'

export default function TrailerTv({ tvDetails }) {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  let [trailerTv, setTrailerTv] = useState(null)

  async function getTrailerTv() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvDetails?.id}/videos?api_key=${API_KEY}
      `)
    setTrailerTv(data.results)
    console.log(data.results);
  }
  useEffect(() => {
    if (tvDetails?.id) {
      getTrailerTv()
    }
  }, [tvDetails?.id])
  const trailerVideoTv = trailerTv?.filter(tv => tv?.type == "Trailer")
  const finalTrailer = trailerVideoTv?.[0]
  return (
    <>
      {finalTrailer ? <div className='inline-block '><iframe allowFullScreen className='rounded-2xl w-full h-52' src={`https://www.youtube.com/embed/${finalTrailer?.key}`}></iframe></div>

        : <p className='text-blue-700'>No Videos Available</p>}

    </>
  )
}
