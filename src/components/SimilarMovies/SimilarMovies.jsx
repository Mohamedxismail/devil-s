import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function SimilarMovies({ Movies }) {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const [loadingApi, setLoadingApi] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  async function getMoviesData() {
    if (!Movies || !Movies.id) return;

    setLoadingApi(true);

    try {
      const [recResponse, similarResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${Movies.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`),
        axios.get(`https://api.themoviedb.org/3/movie/${Movies.id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
      ]);

      setRecommendations(recResponse.data.results || []);
      setSimilarMovies(similarResponse.data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoadingApi(false);
  }

  useEffect(() => {
    getMoviesData();
  }, [Movies?.id]);

  const combinedMovies = [
    ...recommendations.filter(movie => movie.poster_path),
    ...similarMovies.filter(movie => movie.poster_path).filter(movie => !recommendations.some(rec => rec.id === movie.id))
  ];

  return (
    <div className='mt-7 container mx-auto md:mb-3 mb-20'>
      <h1 className='text-white font-bold text-xl mb-5 md:ms-0 ms-2'>You might also like 🎬</h1>

      {loadingApi ? (
        <Loader />
      ) : combinedMovies.length === 0 ? (
        <h1 className='flex justify-center mt-6 mb-5 text-3xl text-red-800'>No Recommendations or Similar Movies Available</h1>
      ) : (
        <Swiper
          slidesPerView={1.3}
          spaceBetween={7}
          breakpoints={{
            640: { slidesPerView: 1.3, spaceBetween: 7 },
            768: { slidesPerView: 3.3, spaceBetween: 7 },
            1024: { slidesPerView: 5.3, spaceBetween: 14 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {combinedMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movieDetails/${movie.id}`}>
                <div className='hover:scale-105 transition-all duration-200 p-1'>
                  <img loading='lazy' className='rounded-t-md' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                  <div className="p-3 bg-[#0d0c0c] rounded-b-md">
                    <h1 className='text-white  mb-2 text-sm font-medium line-clamp-1'>{movie.title}</h1>
                    <div className="flex justify-between items-center text-xs">
                      <span className='text-gray-300'>{movie.release_date.slice(0, 4)}</span>
                      <div className="flex items-center gap-1">
                        <p className='text-white'>{movie.vote_average?.toFixed(1)}</p>
                        <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

