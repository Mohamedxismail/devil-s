import axios from 'axios'
import React, { lazy, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'
const SimilarTv = lazy(()=>import('../SimilarTv/SimilarTv'));
const TrailerTv = lazy(()=>import('../TrailerTv/TrailerTv'));

export default function TvDetails() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  let [tvDetails, setTvDetails] = useState(null)
  let [tvCast, setTvCast] = useState([])
  let [tvCrew, setTvCrew] = useState([])
  let [loadingApi, setLoadingApi] = useState(false)
  const [favorites, setFavorites] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved)
  }, [])

  const toggleFavorite = (tv) => {
    let updated
    if (favorites.find(fav => fav.id === tv.id)) {
      updated = favorites.filter(fav => fav.id !== tv.id)
      toast.dark("Removed from favourites!", { style: { color: "red" } })
    } else {
      updated = [...favorites, tv]
      toast.dark("Added to favourites!", { style: { color: "white" } })
    }
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  async function getTvDetails() {
    setLoadingApi(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
    setTvDetails(data)
    setLoadingApi(false)
  }

  async function getCast() {
    setLoadingApi(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`)
    setTvCast(data.cast)
    setTvCrew(data.crew)
    setLoadingApi(false)
  }

  useEffect(() => {
    getTvDetails()
    getCast()
  }, [id])

  if (loadingApi || !tvDetails) return <Loader />

  return (
    <>
    <helmet><title> tv details </title></helmet>
    <div className='pt-20 container mx-auto'>
      <div className="w-full lg:flex md:mt-3 mt-1">
        <img loading='lazy'
          className="lg:w-3/4 w-full md:h-145 h-100 rounded-3xl mb-4"
          src={`https://image.tmdb.org/t/p/original${tvDetails?.poster_path}`}
          alt={tvDetails?.name} 
        />

        <div className="md:ms-6 ms-3 flex-col">
          <div className="flex md:gap-3 gap-2 items-center">
            <h1 className='text-xl font-bold text-white mb-1 flex items-center gap-2'>
              {tvDetails?.name}
              <span onClick={() => toggleFavorite(tvDetails)} className='cursor-pointer'>
                {favorites.find(fav => fav.id === tvDetails.id) ? (
                  <IoHeart style={{ color: "red", fontSize: 23 }} />
                ) : (
                  <IoHeartOutline style={{ color: "white", fontSize: 23 }} />
                )}
              </span>
            </h1>
            <div className="flex items-center gap-1 ms-2">
              <span className='text-lg text-gray-300'>{tvDetails?.vote_average.toFixed(1)}/10</span>
              <FaStar style={{ color: 'yellow', fontSize: '16px' }} />
            </div>
          </div>

          <p className='mb-5 text-neutral-400'>{tvDetails?.tagline}</p>
          <div className="flex items-center gap-3">
            <span className='text-gray-300 mb-2'>{tvDetails?.number_of_episodes} Episodes / {tvDetails?.number_of_seasons} Seasons</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className='text-gray-300'>{tvDetails?.status}</span>
            <h2 className='text-blue-200'>{tvDetails?.first_air_date.slice(0, 4)}</h2>
          </div>

          <div className="flex gap-2 mb-4 pb-6 border-b pt-3">
            {tvDetails?.genres.map(genre => <h1 className='text-blue-100' key={genre.id}>{genre.name}</h1>)}
          </div>

          <span className='pt-5 text-lg font-medium text-red-600'>Over View</span>
          <p className='font-light text-amber-50 mt-2 mb-6 text-wrap'>{tvDetails?.overview}</p>

          <TrailerTv tvDetails={tvDetails} />

          <h3 className='text-xl text-white mt-3 mb-5'>Star Cast</h3>
          <div className="grid lg:grid-cols-5 md:grid-cols-6 grid-cols-3 gap-3">
            {tvCast.filter(cast => cast.profile_path).slice(0, 10).map(cast => (
              <div key={cast.id}>
                <img className='rounded-2xl mb-2' src={`https://image.tmdb.org/t/p/w342${cast.profile_path}`} />
                <span className='pt-2 text-gray-300'>{cast.original_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SimilarTv Tvs={tvDetails} />
    </div>
    </>
  )
}