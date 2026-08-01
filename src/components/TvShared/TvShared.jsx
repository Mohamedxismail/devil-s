import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa';

export default function TvShared({ apiUrl }) {
  const [tvs, setTvs] = useState([])
  const [page, setPage] = useState(1)
  const [loadingApi, setLoadingApi] = useState(false)
  const [favorites, setFavorites] = useState([])
  

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved)
 import('aos').then(AOS => {
      AOS.init({ duration: 1000 });
    });
    import('aos/dist/aos.css');
  }, [])

  const toggleFavorite = (e, tv) => {
    e.preventDefault();
    e.stopPropagation();

    let updated;
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

  async function getData() {
    if (!apiUrl) return;
    setLoadingApi(true)
    const { data } = await axios.get(`${apiUrl}&page=${page}`)
    setTvs(prev => [...prev, ...data.results])
    setLoadingApi(false)
  }

  function loadMore() {
    setPage(prev => prev + 1)
  }

  useEffect(() => { getData() }, [apiUrl, page])

  return (
    <>
    <helmet><title> Popular Tv Shows  </title></helmet>
      {tvs.length === 0 && <Loader />}
      <div className='container mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 md:gap-3 gap-2 md:p-0 p-2'>
        {tvs.filter(tv => tv.poster_path).map(tv =>
          <Link key={tv.id} to={`/tvDetails/${tv.id}`}>
            <div className='hover:scale-105 transition-all duration-200 relative'>
              <div className='pb-1' data-aos="fade-up" data-aos-anchor-placement="top-center">
                
                <img loading='lazy'
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="tv poster"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${loadingApi ? 'opacity-100' : 'opacity-100'}`}
                  onLoad={() => setLoadingApi(false)}
                />                <div className="p-3 bg-[#080808] rounded-b-md">
                  <div className="mb-2 flex justify-between items-center ">
                    <h1 className='text-white  text-sm font-medium line-clamp-1'>{tv.name}</h1>
                    <div
                  onClick={(e) => toggleFavorite(e, tv)}
                  className=" z-10 cursor-pointer"
                >
                  {favorites.find(fav => fav.id === tv.id) ? (
                    <IoHeart style={{ color: "red", fontSize: 23 }} />
                  ) : (
                    <IoHeartOutline style={{ color: "white", fontSize: 23 }} />
                  )}
                </div>

                  </div>

                  <div className="flex justify-between items-center">
                    <span className='text-gray-300 text-xs'>{tv.first_air_date?.slice(0, 4)}</span>
                    <div className="flex items-center text-xs gap-1">
                      <p className='text-white'>{tv.vote_average?.toFixed(1)}</p>
                      <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="flex justify-end p-4 container mx-auto md:mb-0 mb-20">
        {loadingApi ? <button disabled className='bg-red-800 opacity-75 text-white p-3 text-lg font-bold rounded-xl'>Loading</button>
          : <button onClick={loadMore} className='bg-red-800 text-white p-3 text-lg font-bold rounded-xl cursor-pointer hover:bg-red-600 transition-all duration-700'>Load More</button>
        }
      </div>
    </>
  )
}