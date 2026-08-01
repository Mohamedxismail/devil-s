import styles from './Home.module.css'
import HeroSection from './component/HeroSection/HeroSection'
import { lazy, Suspense } from "react";
const TrendingTv = lazy(() => import('./component/TrendingTv/TrendingTv'));
const NowPlaying = lazy(() => import('./component/NowPlaying/NowPlaying'));
const TopRated = lazy(() => import('./component/TopRated/TopRated'));
const TopRatedTv = lazy(() => import('./component/TopRatedTv/TopRatedTv'));


export default function Home() {

  return (
    <>
    <helmet><title> Home page  </title></helmet>
      <HeroSection/>
      <Suspense><TrendingTv/></Suspense>
      <Suspense><NowPlaying/></Suspense>
      <Suspense><TopRated/></Suspense>
      <Suspense><TopRatedTv/></Suspense>
    </>
  )
}
