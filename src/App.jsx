
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from "react";
import { ToastContainer } from 'react-toastify';
const Loader = () => <div className="loader">Loading...</div>;
const LayOut = lazy(() => import('./components/LayOut/LayOut'));
const Home = lazy(() => import('./components/Home/Home'));
const Movies = lazy(() => import('./components/Movies/Movies'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));
const Tv = lazy(() => import('./components/Tv/Tv'));
const MovieDetails = lazy(() => import('./components/MovieDetails/MovieDetails'));
const TvDetails = lazy(() => import('./components/TvDetails/TvDetails'));
const AnimeCartoon = lazy(() => import('./components/AnimeCartoon/AnimeCartoon'));
const MoviesAnime = lazy(() => import('./components/MoviesAnime/MoviesAnime'));
const TvAnime = lazy(() => import('./components/TvAnime/TvAnime'));
const PopularAnime = lazy(() => import('./components/PopularAnime/PopularAnime'));
const Search = lazy(() => import('./components/Search/Search'));
const Action = lazy(() => import('./components/Action/Action'));
const Comedy = lazy(() => import('./components/Comedy/Comedy'));
const Drama = lazy(() => import('./components/Drama/Drama'));
const PopularMovies = lazy(() => import('./components/Movies/component/PopularMovies/PopularMovies'));
const PopularTv = lazy(() => import('./components/Tv/component/PopularTv/PopularTv'));
const ComedyTv = lazy(() => import('./components/ComedyTv/ComedyTv'));
const DramaTv = lazy(() => import('./components/DramaTv/DramaTv'));
const ActionTv = lazy(() => import('./components/ActionTv/ActionTv'));
const Favourites = lazy(() => import('./components/favourites/Favourites'));

function App() {

  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={<Loader />}>
          <LayOut />
        </Suspense>
      ),
      children: [
        {
          index: true, element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "home", element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "favourites", element: (
            <Suspense fallback={<Loader />}>
              <Favourites />
            </Suspense>
          )
        },
        {
          path: "movies",
          element: (
            <Suspense fallback={<Loader />}>
              <Movies />
            </Suspense>
          ),
          children: [
            {
              index: true, element: (
                <Suspense fallback={<Loader />}>
                  <PopularMovies />
                </Suspense>
              )
            },
            {
              path: "action", element: (
                <Suspense fallback={<Loader />}>
                  <Action />
                </Suspense>
              )
            },
            {
              path: "comedy", element: (
                <Suspense fallback={<Loader />}>
                  <Comedy />
                </Suspense>
              )
            },
            {
              path: "drama", element: (
                <Suspense fallback={<Loader />}>
                  <Drama />
                </Suspense>
              )
            },
          ]
        },
        {
          path: "movieDetails/:id", element: (
            <Suspense fallback={<Loader />}>
              <MovieDetails />
            </Suspense>
          )
        },
        {
          path: "tvDetails/:id", element: (
            <Suspense fallback={<Loader />}>
              <TvDetails />
            </Suspense>
          )
        },
        {
          path: "tv",
          element: (
            <Suspense fallback={<Loader />}>
              <Tv />
            </Suspense>
          ),
          children: [
            {
              index: true, element: (
                <Suspense fallback={<Loader />}>
                  <PopularTv />
                </Suspense>
              )
            },
            {
              path: "actionTv", element: (
                <Suspense fallback={<Loader />}>
                  <ActionTv />
                </Suspense>
              )
            },
            {
              path: "comedyTv", element: (
                <Suspense fallback={<Loader />}>
                  <ComedyTv />
                </Suspense>
              )
            },
            {
              path: "dramaTv", element: (
                <Suspense fallback={<Loader />}>
                  <DramaTv />
                </Suspense>
              )
            },
          ]
        },
        {
          path: "search", element: (
            <Suspense fallback={<Loader />}>
              <Search />
            </Suspense>
          )
        },
        {
          path: "animeCartoon",
          element: (
            <Suspense fallback={<Loader />}>
              <AnimeCartoon />
            </Suspense>
          ),
          children: [
            {
              index: true, element: (
                <Suspense fallback={<Loader />}>
                  <PopularAnime />
                </Suspense>
              )
            },
            {
              path: "moviesAnime", element: (
                <Suspense fallback={<Loader />}>
                  <MoviesAnime />
                </Suspense>
              )
            },
            {
              path: "tvAnime", element: (
                <Suspense fallback={<Loader />}>
                  <TvAnime />
                </Suspense>
              )
            },
          ]
        },
        {
          path: "*", element: (
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          )
        },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer toastClassName={"my-toaste"} autoClose={300}  />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
