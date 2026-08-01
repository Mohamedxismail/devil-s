import styles from './AnimeCartoon.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import PopularAnime from '../PopularAnime/PopularAnime'

export default function AnimeCartoon() {

  
    
  return (
    <div className='pt-24  container mx-auto'>
      <div className="flex justify-between md:ps-0 ps-2 md:mb-5 mb-2 md:text-2xl text-xl text-white">
    <h1>Popular <span className='text-red-700'>Anime</span></h1>
   <div className="flex md:gap-4 md:me-3 me-1 gap-2">
     <NavLink className='text-red-500' to={'moviesAnime'}>Movies</NavLink>
   <NavLink className='text-red-500' to={'tvAnime'}>Tv</NavLink>
   </div>
   </div>
   
   <Outlet/>
    </div>
  )
}
