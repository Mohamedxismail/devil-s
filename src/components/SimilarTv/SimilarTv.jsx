import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './SimilarTv.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function SimilarTv({ Tvs }) {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
   const [loadingApi, setLoadingApi] = useState(false);
   const [recommendations, setRecommendations] = useState([]);
   const [similarTv, setSimilarTv] = useState([]);

async function getTvData() {
if (!Tvs || !Tvs.id) return;
  setLoadingApi(true);
 try {
      const [recResponse, similarResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/tv/${Tvs.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`),
        axios.get(`https://api.themoviedb.org/3/tv/${Tvs.id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
      ]);

      setRecommendations(recResponse.data.results || []);
      setSimilarTv(similarResponse.data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoadingApi(false);
  }

  useEffect(() => {
    getTvData()

  }, [Tvs?.id])
  const combinedTv = [
    ...recommendations.filter(tv => tv.poster_path),
    ...similarTv.filter(tv => tv.poster_path).filter(tv => !recommendations.some(rec => rec.id === tv.id))
  ];

  return (
    <>
     <div className='mt-7 container mx-auto md:mb-3 mb-20'>
          <h1 className='text-white font-bold text-xl mb-5 md:ms-0 ms-2'>You might also like </h1>
    
          {loadingApi ? (
            <Loader />
          ) : combinedTv.length === 0 ? (
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
              {combinedTv.map(tv => (
                <SwiperSlide key={tv.id}>
                  <Link to={`/tvDetails/${tv.id}`}>
                    <div className='hover:scale-105 transition-all duration-200 p-1'>
              <img loading='lazy' className='rounded-t-md' src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} />
              <div className="p-3 bg-[#0d0c0c] rounded-b-md">
                <h1 className='text-white  mb-2 text-sm font-medium line-clamp-1'>{tv.name}</h1>
                <div className="flex justify-between items-center text-xs">
                   <span className='text-gray-300'>{tv.first_air_date.slice(0,4)}</span>
                   <div className="flex items-center content-center gap-1 ">
                     <p className='text-white'>{tv.vote_average?.toFixed(1)}</p>
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
    </>
  )
}
