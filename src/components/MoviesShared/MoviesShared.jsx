import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa';

export default function MoviesShared({ apiUrl }) {
  const API_KEY = import.meta.env.VITE_TMDB_KEY
  let [loadingApi, setLoadingApi] = useState(false)
  let [movies, setMovies] = useState([])
  let [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
 import('aos').then(AOS => {
      AOS.init({ duration: 1000 });
    });
    import('aos/dist/aos.css');
  }, [])

  const toggleFavorite = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();

    let updated;
    if (favorites.find(fav => fav.id === movie.id)) {

      updated = favorites.filter(fav => fav.id !== movie.id);
      toast.dark("Removed from favourites !", { style: { color: "red" } })
    } else {

      updated = [...favorites, movie];
      toast.dark("Added to favourites !", { style: { color: "white" } })
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  async function getData() {
    if (!apiUrl) return;
    setLoadingApi(true)
    let { data } = await axios.get(`${apiUrl}&page=${page}`)
    setMovies(prev => [...prev, ...data.results])
    setLoadingApi(false)
  }

  function loadMore() {
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    getData()
  }, [apiUrl, page])

  return (
    <>
    <helmet><title> Popular Movies   </title></helmet>
      {movies.length == 0 && <Loader />}
      <div className='container mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 md:gap-3 gap-2 md:p-0 p-2 '>
        {movies.filter(movie => movie.poster_path).map(movie =>
          <Link key={movie.id} to={`/movieDetails/${movie.id}`}>
            <div className='hover:scale-105 transition-all duration-200 relative'>

              <div className='pb-1' data-aos="fade-up" data-aos-anchor-placement="top-center" >
                <img loading='lazy'  
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => {
                    setImageLoaded(true);
                  }}/>   
                  <div className="p-3 bg-[#080808] rounded-b-md">
                    <div className="mb-2 flex justify-between items-center ">
                  <h1 className='text-white  text-sm font-medium line-clamp-1'>{movie.title}</h1>
                  <div
                  onClick={(e) => toggleFavorite(e, movie)}
                  className=" z-10 cursor-pointer"
                >
                  {favorites.find(fav => fav.id === movie.id) ? (
                    <IoHeart style={{ color: "red", fontSize: "22px" }} />
                  ) : (
                    <IoHeartOutline style={{ color: "white", fontSize: "22px" }} />
                  )}
                </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className='text-gray-300 text-xs'>{movie.release_date?.slice(0, 4)}</span>
                    <div className="flex items-center text-xs gap-1 ">
                      <p className='text-white'>{movie.vote_average?.toFixed(1)}</p>
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
          : <button className='bg-red-800 text-white p-3 text-lg font-bold rounded-xl cursor-pointer hover:bg-red-600 transition-all duration-700' onClick={loadMore}>Load More</button>
        }
      </div>
    </>
  )
}
