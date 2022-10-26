import { FunctionComponent, Fragment, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import './style.scss';
import { APIURL, APIKEY, HOME_PAGE, FAVOURITES_PAGE, WATCHLATER_PAGE, FAVOURITES_SECTION, WATCHLATER_SECTION } from "../../utils"

const Trailers = dynamic(() => import('../Trailers'))
const Movies = dynamic(() => import('../Movies'))

const Home: FunctionComponent = () => {
  const getFavourites: any = localStorage.getItem(FAVOURITES_SECTION)
  const getWatchLater: any = localStorage.getItem(WATCHLATER_SECTION)

  const [width, setWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState<any | []>([])
  const [trailerData, setTrailerData] = useState<Number | null>(null)
  const [videos, setVideos] = useState<any | []>([])
  const [favourites, setFavourites] = useState<any | []>((getFavourites !== null) ? getFavourites.split(',').map(Number) : [])
  const [watchLater, setWatchLater] = useState<any | []>((getWatchLater !== null) ? getWatchLater.split(',').map(Number) : [])
  const [movieList, setMovieLists] = useState<any | []>([])
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  const [page, setPage] = useState(HOME_PAGE)
  
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
    setPage(HOME_PAGE)
  }

  const callSections = (array: any, page: string) => {
    let newList: string[] = [];
    newList = movies.filter((element: any) => { return array.includes(element.id) })
    setMovieLists(newList)
    setPage(page)
  }

  const updatePage = (page: string, type: string, array: [{ id: never }]) => {
    if (page === HOME_PAGE) { setMovieLists(movies) }
    let newList: string[] = [];
    if (page === FAVOURITES_PAGE && type === FAVOURITES_SECTION) {
      newList = movies.filter((element: any) => { return array.includes(element.id) })
      setMovieLists(newList)
    }
    if (page === WATCHLATER_PAGE && type === WATCHLATER_SECTION) {
      newList = movies.filter((element: any) => { return array.includes(element.id) })
      setMovieLists(newList)
    }
  }

  return (<div className="Home">
    <header className="Home-header">
      <p>Feel Good!</p>
    </header>
    <div>
      <input type="text" className="searchMovie" data-testid="searchMovie" id="searchMovie" onChange={handleSearchMovie} />
    </div>
    <div className="Home-links">
      <div onClick={callHome}>Home</div>
      <div onClick={() => callSections(favourites, FAVOURITES_PAGE)}>Favourites</div>
      <div onClick={() => callSections(watchLater, WATCHLATER_PAGE)}>Watch Later</div>
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
      <Suspense fallback={<h1>Loading trailers...</h1>}>
        <Trailers videos={videos} width={width} setTrailerData={setTrailerData} />
      </Suspense>
    ) : <Fragment />}
  </div>
  );
}

export default Home;