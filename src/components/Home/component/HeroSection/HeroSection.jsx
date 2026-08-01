import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Loader from '../../../Loader/Loader';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


export default function HeroSection() {
  let [topMovies, setTopMovies] = useState([])
  let [loadingTopDayApi, setLoadingTopDayApi] = useState(false)
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  async function getTopMovies() {
    setLoadingTopDayApi(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}
`)
    setTopMovies(data.results)
    setLoadingTopDayApi(false)
    console.log(data.results);

  }
  useEffect(() => {
    getTopMovies()
  }, [])

  return (
    <>
      <Swiper

        pagination={{ clickable: true }}
        spaceBetween={0}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={700}
        className="mySwiper   "
      >
        {topMovies.length == 0 && <Loader />}
        {topMovies.length != 0 && topMovies.slice(0, 11).map((movie) => (
          <SwiperSlide key={movie.id} className=''>
            <Link to={`/movieDetails/${movie.id}`}>
              <div className=" relative w-full md:h-screen h-122">
                <img loading='lazy'
                  className="w-full h-full  rounded-b-3xl "
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt={movie.title} />
                <div className="absolute inset-0  bg-black/50 rounded-b-3xl flex items-end ">
                  <div className="text-white md:p-10 p-5 max-w-xl md:ms-4 mb-7">
                    <div className="flex items-center">
                      <span className='text-red-800 me-3 '>Top Trending day</span>
                      <i className="fa-solid fa-arrow-trend-up text-red-800"></i>
                    </div>
                    <div className="flex items-center mb-6 mt-4 gap-1">
                      <h2 className="text-2xl font-bold me-2 ">{movie.title}</h2>
                      <p className='ms-3 mt-2'>{movie.vote_average.toFixed(1)}</p>
                      <FaStar style={{ color: 'yellow', fontSize: '15px' , marginTop:"7px" }} />
                    </div>
                    <p className="line-clamp-3 ">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>


    </>
  )
}
