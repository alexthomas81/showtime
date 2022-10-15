import { FunctionComponent, Fragment, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import './style.css';
import { APIURL, APIKEY, homePage, favouritesPage, watchLaterPage, favouritesSection, watchLaterSection } from "../../utils"

const Trailers = dynamic(() => import('../Trailers'))
const Movies = dynamic(() => import('../Movies'))

const Home: FunctionComponent = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState<any | []>([])
  const [trailerData, setTrailerData] = useState<Number | null>(null)
  const [videos, setVideos] = useState<any | []>([])
  const [favourites, setFavourites] = useState<any | []>([])
  const [watchLater, setWatchLater] = useState<any | []>([])
  const [movieList, setMovieLists] = useState<any | []>([])
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  const [page, setPage] = useState(homePage)

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    if (movies.length <= 0) {
      fetch(`${APIURL}trending/all/day?api_key=${APIKEY}`)
        .then(response => response.json())
        .then(data => {
          setMovies(data.results)
        });
    }
  }, [movies, APIKEY, APIURL])

  useEffect(() => {
    if (movies.length >= 0) {
      setMovieLists(movies)
    }
  }, [movies]);

  const handleSearchMovie = (e: any) => {
    setMovieLists(movies.filter((element: any) => { return element.title ? element.title.toLowerCase().includes(e.target.value.toLowerCase()) : element.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
  }

  const ShowTrailer = (path: number) => {
    fetch(`${APIURL}movie/${path}/videos?api_key=${APIKEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setVideos(data.results)
          setTrailerData(path)
        } else {
          setTrailerData(null)
        }
      })
      .catch(error => {
        setTrailerData(null)
        throw (error);
      })
  }

  const callHome = () => {
    setMovieLists(movies)
    setPage(homePage)
  }

  const callSections = (array: any, page: string) => {
    let newList: string[] = [];
    newList = movies.filter((element: any) => { return array.includes(element.id) })
    setMovieLists(newList)
    setPage(page)
  }

  const updatePage = (page: string, type: string, array: [{ id: never }]) => {
    if (page === homePage) { setMovieLists(movies) }
    let newList: string[] = [];
    if (page === favouritesPage && type === favouritesSection) {
      newList = movies.filter((element: any) => { return array.includes(element.id) })
      setMovieLists(newList)
    }
    if (page === watchLaterPage && type === watchLaterSection) {
      newList = movies.filter((element: any) => { return array.includes(element.id) })
      setMovieLists(newList)
    }
  }

  return (<div className="Home">
    <header className="Home-header">
      <p>Feel Good!</p>
    </header>
    <div>
      <input type="text" className="searchMovie" id="searchMovie" onChange={handleSearchMovie} />
    </div>
    <div className="Home-links">
      <div onClick={() => callHome()}>Home</div>
      <div onClick={() => callSections(favourites, favouritesPage)}>Favourites</div>
      <div onClick={() => callSections(watchLater, watchLaterPage)}>Watch Later</div>
    </div>
    <Movies
      movieList={movieList}
      page={page}
      updatePage={updatePage}
      width={width}
      favourites={favourites}
      watchLater={watchLater}
      setFavourites={setFavourites}
      setWatchLater={setWatchLater}
      ShowTrailer={ShowTrailer}
    />
    {trailerData ? (
      <Suspense>
        <Trailers videos={videos} width={width} setTrailerData={setTrailerData} />
      </Suspense>
    ) : <Fragment />}
  </div>
  );
}

export default Home;
