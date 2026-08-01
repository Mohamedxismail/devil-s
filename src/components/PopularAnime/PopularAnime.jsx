import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './PopularAnime.module.css'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'

export default function PopularAnime() {
  let [anime, setAnime] = useState([])
  const [favorites, setFavorites] = useState([])
  const API_KEY = import.meta.env.VITE_TMDB_KEY

  async function getPopularAnime() {
    let movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&page=1`)
    let tv = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&page=1`)
    
    const compined = [...movies.data.results, ...tv.data.results]
    const reversed = compined.reverse()
    const shuffled = reversed.sort(() => Math.random() - 0.5)

    setAnime(shuffled)
  }

  useEffect(() => {
    getPopularAnime()

    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [])

  // ✅ نفس toggle بتاعك
  const toggleFavorite = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    let updated

    if (favorites.find(fav => fav.id === item.id)) {
      updated = favorites.filter(fav => fav.id !== item.id)
      toast.dark("Removed from favourites!", { style: { color: "red" } })
    } else {
      updated = [...favorites, item]
      toast.dark("Added to favourites!", { style: { color: "white" } })
    }

    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <>
    <helmet><title> Popular Anime  </title></helmet>`
      {anime.length === 0 && <Loader />}

      <div className='container mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 md:mt-5 mt-2 md:gap-3 gap-2 md:p-0 p-2 md:mb-4 mb-20'>
        
        {anime.map(item =>
          <Link key={item.id} to={item.title ? `/movieDetails/${item.id}` : `/tvDetails/${item.id}`}>
            
            <div className='hover:scale-105 transition-all duration-200 relative'>
              
              <div className='pb-1'>

                <img className='rounded-t-md' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />

                <div className="p-3 bg-[#0d0c0c] rounded-b-md">
                  <div className="mb-2 flex justify-between items-center">
                    <h1 className='text-white  text-sm font-medium line-clamp-1'>
                    {item.title || item.name}
                  </h1>
                    <div
                  onClick={(e) => toggleFavorite(e, item)}
                  className="z-10 cursor-pointer"
                >
                  {favorites.find(fav => fav.id === item.id) ? (
                    <IoHeart style={{ color: "red", fontSize: "22px" }} />
                  ) : (
                    <IoHeartOutline style={{ color: "white", fontSize: "22px" }} />
                  )}
                </div>
                  </div>
                  

                  <div className="flex justify-between items-center text-xs">
                    <span className='text-gray-300'>
                      {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}
                    </span>

                    <div className="flex items-center text-xs gap-1">
                      <p className='text-white'>{item.vote_average?.toFixed(1)}</p>
                      <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </Link>
        )}

      </div>
    </>
  )
}