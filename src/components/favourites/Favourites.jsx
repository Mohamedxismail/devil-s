import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHeart } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
import { FaStar } from 'react-icons/fa'
import { RiHeartAdd2Line } from "react-icons/ri";
export default function Favourites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
    window.addEventListener('storage', loadFavorites)
    return () => window.removeEventListener('storage', loadFavorites)
  }, [])

  const loadFavorites = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
    setLoading(false)
  }

  const removeFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favorites.filter(item => item.id !== id)
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavorites(updated)
    toast.dark("Removed from favourites!", { style: { color: "red" } })
  }

  if (loading) return <Loader />
  if (favorites.length === 0) return <> <RiHeartAdd2Line className='text-gray-700 text-8xl contaner mx-auto text-center mt-52' /><p className='text-white text-center mt-7 text-2xl'>No favourite items yet ! <br /> Your favourites movies and series will apear here</p>
  <Link to={"/home"} className='text-center block rounded-full bg-red-800 w-fit mx-auto p-3 mt-5 text-white font-semibold text-lg'>To movies and tv series</Link></>

  return (
    <>
    <helmet><title> Favourite page  </title></helmet>
    <h1 className='text-white pt-24 container mx-auto md:ps-0 ps-2 text-2xl'>Favourites</h1>
    <div className='container mx-auto mb-22 mt-5 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 md:gap-3 gap-2 md:p-0 p-2'>
      {favorites.map(item =>
        <div key={item.id} className='relative hover:scale-105 transition-all duration-200'>
          <Link to={item.title ? `/movieDetails/${item.id}` : `/tvDetails/${item.id}`}>
            <img loading="lazy" className='rounded-t-md cursor-pointer' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
            <div className="p-3 bg-[#080808] rounded-b-md cursor-pointer">
              <div className="flex justify-between items-center mb-2">
              <h1 className='text-white text-sm font-medium line-clamp-1'>
                {item.title || item.name}
              </h1>
              <div
            onClick={(e) => removeFavorite(e,item.id)}
            className=" z-10 cursor-pointer"
          >
            <IoHeart style={{ color: "red", fontSize: 21 }} />
          </div>
          </div>
              <div className="flex justify-between items-center">
                <span className='text-gray-300 text-xs'>{(item.release_date || item.first_air_date)?.slice(0, 4)}</span>
                <div className="flex items-center text-xs gap-1">
                  <p className='text-white'>{item.vote_average?.toFixed(1)}</p>
                  <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
    </>
  )
}