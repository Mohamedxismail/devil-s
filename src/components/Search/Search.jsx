import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([])

  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      const filteredResults = data.results.filter(
        (item) => item.media_type === 'movie' || item.media_type === 'tv'
      );

      setResults(filteredResults);
    } catch (error) {
      console.error("Error Search", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <helmet><title> Search  </title></helmet>
    <div className="min-h-screen text-white p-6 pt-24">
      <div className="md:max-w-4xl mx-auto mb-12">
        <h1 className="text-2xl font-bold mb-5 text-center mt-4">
          Find Movies and Tv Series
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder=" Movies and TV series"
            className="w-full p-4 pl-12 rounded-2xl bg-black/15 border transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isLoading && (
            <div className="absolute left-4 top-4">
              <div className="animate-spin h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:mb-2 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {results.filter(item => item.poster_path).slice(0, 10).map((item) => (
            
            <Link key={item.id} to={item.title ? `/movieDetails/${item.id}` : `/tvDetails/${item.id}`}>
              
              <div className="bg-[#0d0c0c] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-slate-800 shadow-xl">
                
                <div className="relative">

                  {/* ❤️ القلب */}
                  <div
                    onClick={(e) => toggleFavorite(e, item)}
                    className="absolute top-2 left-2 z-10 cursor-pointer"
                  >
                    {favorites.find(fav => fav.id === item.id) ? (
                      <IoHeart style={{ color: "red", fontSize: "22px" }} />
                    ) : (
                      <IoHeartOutline style={{ color: "white", fontSize: "22px" }} />
                    )}
                  </div>

                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-[12px] px-2 py-1 rounded-md text-red-500 font-bold">
                    {item.media_type === 'movie' ? 'Movie' : 'Tv'}
                  </span>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                    {item.title || item.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {(item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4))}
                    </span>

                    <div className='flex items-center gap-1'>
                      <FaStar style={{ color: 'yellow', fontSize: '15px' }} />
                      {item.vote_average?.toFixed(1)}
                    </div>
                  </div>
                </div>

              </div>

            </Link>
          ))}
        </div>

        {!isLoading && searchTerm && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 italic">
              No Results For {searchTerm}
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Search;