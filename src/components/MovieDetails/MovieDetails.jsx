import axios from 'axios'
import React, { lazy, useEffect, useState } from 'react'
import styles from './MovieDetails.module.css'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'

const SimilarMovies = lazy(()=>import('../SimilarMovies/SimilarMovies'));
const Video = lazy(()=>import('../Video/Video'))

export default function MovieDetails() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY

  let [moviesDetails, setMoviesDetails] = useState(null)
  let [moviesCast, setMoviesCast] = useState([])
  let [loadingApi, SetLoadingApi] = useState(false)
  let [moviesCrew, setMoviesCrew] = useState([])

  const [favorites, setFavorites] = useState([])

  const { id } = useParams()

  // تحميل الفيفورت
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [])

  async function getMovieDetails() {
    SetLoadingApi(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    setMoviesDetails(data)
    SetLoadingApi(false)
  }

  async function getCast() {
    SetLoadingApi(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
    setMoviesCast(data.cast)
    setMoviesCrew(data.crew)
    SetLoadingApi(false)
  }

  useEffect(() => {
    getMovieDetails()
    getCast()
  }, [id])

  // ❤️ toggle
  const toggleFavorite = () => {
    if (!moviesDetails) return

    let updated

    if (favorites.find(fav => fav.id === moviesDetails.id)) {
      updated = favorites.filter(fav => fav.id !== moviesDetails.id)
      toast.dark("Removed from favourites!", { style: { color: "red" } })
    } else {
      updated = [...favorites, moviesDetails]
      toast.dark("Added to favourites!", { style: { color: "white" } })
    }

    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  if (loadingApi) {
    return <Loader />
  }

  return (
    <>
    <helmet><title> Movie details </title></helmet>
    <div className='pt-20 container mx-auto'>
      {loadingApi == true && <Loader />}

      <div className=" w-full lg:flex  md:mt-3 mt-1">
        <img
          className="lg:w-3/4 w-full md:h-145 h-100 rounded-3xl mb-4"
          src={`https://image.tmdb.org/t/p/original${moviesDetails?.poster_path}`}
          alt={moviesDetails?.title}
        />

        <div className=" md:ms-6 ms-3 flex-col">
          <div className="flex md:gap-3 gap-2 items-center">
            <h1 className='text-xl font-bold text-white mb-1'>
              {moviesDetails?.title}
            </h1>
            <div
              onClick={toggleFavorite}
              className="cursor-pointer"
            >
              {favorites.find(fav => fav.id === moviesDetails?.id) ? (
                <IoHeart style={{ color: "red", fontSize: "26px" }} />
              ) : (
                <IoHeartOutline style={{ color: "white", fontSize: "26px" }} />
              )}
            </div>

            <div className="flex items-center gap-1 ms-2">
              <span className='text-lg text-gray-300'>
                {moviesDetails?.vote_average.toFixed(1)}/10
              </span>
              <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
            </div>
          </div>

          <p className='mb-5 text-neutral-400'>{moviesDetails?.tagline}</p>

          <div className="flex items-center gap-3 mb-3 ">
            <h2 className=' text-blue-200'>
              {moviesDetails?.release_date.slice(0, 4)}
            </h2>
            <span className='text-md text-blue-200'>
              {Math.floor(moviesDetails?.runtime / 60)}h {Math.floor(moviesDetails?.runtime % 60)}m
            </span>
          </div>

          <div className="flex gap-2 mb-4 pb-6 border-b border-gray-500">
            {moviesDetails?.genres.map(genre =>
              <h4 key={genre.id} className='text-blue-100 '>{genre.name}</h4>
            )}
          </div>

          <span className='pt-5 text-lg font-medium text-red-600'>Over View</span>
          <p className='font-light text-amber-50 mt-2 mb-6'>
            {moviesDetails?.overview}
          </p>

          <Video moviesdetails={moviesDetails} />

          <div className="flex gap-2 mt-3">
            <span className='text-white'>Director :</span>
            {moviesCrew.filter(crew => crew.job == "Director").map(crew =>
              <h1 key={crew.id} className='text-md text-gray-300'> {crew.name}</h1>
            )}
          </div>

          <h3 className='text-xl text-white mt-5 mb-5'>Star Cast</h3>

          <div className=" grid lg:grid-cols-6 md:grid-cols-6 grid-cols-3 gap-3">
            {moviesCast.filter(cast => cast.profile_path).slice(0, 10).map(cast =>
              <div key={cast.id}>
                <img className='rounded-2xl mb-2'
                  src={`https://image.tmdb.org/t/p/w342${cast.profile_path}`} />
                <span className='pt-2 text-gray-300'>{cast.original_name}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      <SimilarMovies Movies={moviesDetails} />
    </div>
    </>
  )
}
