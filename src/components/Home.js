import { Fragment, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import '../styles/Home.css';

const Trailers = dynamic(() => import('./Trailers'))
const Movies = dynamic(() => import('./Movies'))

function Home() {
  const [width, setWidth] = useState(window.innerWidth);
  let APIURL = 'https://api.themoviedb.org/3/'
  let APIKEY = '44690770c7218f35a73e5bdda03ad0bd'
  const [movies, setMovies] = useState([])
  const [trailerData, setTrailerData] = useState(null)
  const [videos, setVideos] = useState([])
  const [personal, setPersonal] = useState({
    favourites: [],
    watchLater: []
  })
  const [movieList, setMovieLists] = useState([])
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  const [page, setPage] = useState('home')

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    if (movies.length === 0) {
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

  const handleSearchMovie = (e) => {
    setMovieLists(movies.filter(element => { return element.title ? element.title.toLowerCase().includes(e.target.value.toLowerCase()) : element.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
  }

  const ShowTrailer = (path) => {
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
    setPage('home')
  }

  const callFavourites = () => {
    let newList = movies.filter(element => { return personal.favourites.includes(element.id) })
    setMovieLists(newList)
    setPage('favourites')
  }

  const callWatchLater = () => {
    let newList = movies.filter(element => { return personal.watchLater.includes(element.id) })
    setMovieLists(newList)
    setPage('watchLater')
  }

  const updatePage = (page, type, array) => {
    if (page == 'home') { setMovieLists(movies) }
    if (page == 'favourites' && type == 'fav') {
      let newList = movies.filter(element => { return array.includes(element.id) })
      setMovieLists(newList)
    }
    if (page == 'watchLater' && type == 'wat') {
      let newList = movies.filter(element => { return array.includes(element.id) })
      setMovieLists(newList)
    }
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <p>Feel Good!</p>
      </header>
      <div>
        <input type="text" className="searchMovie" id="searchMovie" onChange={handleSearchMovie} />
      </div>
      <div className="Home-links">
        <div onClick={() => callHome()}>Home</div>
        <div onClick={() => callFavourites()}>Favourites</div>
        <div onClick={() => callWatchLater()}>Watch Later</div>
      </div>
      <Movies movieList={movieList} page={page} updatePage={updatePage} width={width} personal={personal} setPersonal={setPersonal} ShowTrailer={ShowTrailer} />

      {trailerData ? (
        <Suspense>
          <Trailers videos={videos} width={width} setTrailerData={setTrailerData} />
        </Suspense>
      ) : <Fragment />}
    </div>
  );
}

export default Home;
