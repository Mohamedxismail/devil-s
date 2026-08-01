import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Video.module.css'
import { Link } from 'react-router-dom'
import { iframe } from 'framer-motion/client'

export default function Video({ moviesdetails }) {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  let [videos, setVideos] = useState(null)

  async function getVideo() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${moviesdetails?.id}/videos?api_key=${API_KEY}
`)
    setVideos(data.results)
    console.log(data.results);
  }
  useEffect(() => {
    if (moviesdetails?.id) {
      getVideo()
    }
  }, [moviesdetails?.id])
  const videoTop = videos?.filter(video => video?.type == "Trailer")
  const finalTrailer = videoTop?.[0]

  return (
    <>
    {finalTrailer ? <div className='inline-block'><iframe allowFullScreen className='rounded-2xl w-full h-52' src={`https://www.youtube.com/embed/${finalTrailer?.key}`}></iframe></div>

       : <p className='text-blue-900'>No Videos Available</p>}

      







    </>

  )
}
