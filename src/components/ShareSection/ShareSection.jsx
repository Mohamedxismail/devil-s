import axios from 'axios'
import React, { lazy, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa';

export default function ShareSection({ ApiUrl }) {
  let [sections, setSection] = useState([])
  let [loadingApi, setLoadingApi] = useState(false)
  const [favorites, setFavorites] = useState([])

  const API_KEY = import.meta.env.VITE_TMDB_KEY

  async function getSection() {
    setLoadingApi(true)
    let { data } = await axios.get(`${ApiUrl}`)
    setSection(data.results)
    setLoadingApi(false)
  }

  useEffect(() => {
    getSection()

    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [ApiUrl])

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
      <div className="container mx-auto p-4 ps-3">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={8}
          breakpoints={{
            640: { slidesPerView: 1.3, spaceBetween: 8 },
            768: { slidesPerView: 3.3, spaceBetween: 8 },
            1024: { slidesPerView: 5.3, spaceBetween: 8 },
          }}
          modules={[Pagination, lazy]}
          className="mySwiper"
        >
          {sections.length == 0 && <Loader />}

          {sections.length != 0 && sections.filter(section => section.poster_path).map(section => (
            
            <SwiperSlide key={section.id}>
              <Link to={section.name ? `/tvDetails/${section.id}` : `/movieDetails/${section.id}`}>
                
                <div className='bg-[#0a0a0a] rounded overflow-x-auto md:hover:scale-105 md:transition-all duration-200 md:p-4 p-2 relative'>

                  <img
                    loading='lazy'
                    className='w-full h-full object-cover'
                    src={`https://image.tmdb.org/t/p/w500${section.poster_path}`}
                    alt={section.name || section.title}
                  />

                  <div className="pt-3">
                    <div className="flex justify-between items-center mb-3">
                    <h1 className='text-white font-medium  text-sm line-clamp-1'>
                      {section.name || section.title}
                    </h1>
                      <div
                    onClick={(e) => toggleFavorite(e, section)}
                    className="cursor-pointer"
                  >
                    {favorites.find(fav => fav.id === section.id) ? (
                      <IoHeart style={{ color: "red", fontSize: "22px" }} />
                    ) : (
                      <IoHeartOutline style={{ color: "white", fontSize: "22px" }} />
                    )}
                  </div>
                  </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className='text-gray-300'>
                        {section.first_air_date?.slice(0, 4) || section.release_date?.slice(0, 4)}
                      </span>

                      <div className="flex items-center justify-center gap-1">
                        <p className='text-white text-md'>
                          {section.vote_average?.toFixed(1)}
                        </p>
                       <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                      </div>
                    </div>
                  </div>

                </div>

              </Link>
            </SwiperSlide>

          ))}
        </Swiper>
      </div>
    </>
  )
}
