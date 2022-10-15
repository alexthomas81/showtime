import { Fragment, Suspense, useEffect, useState } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic'
import '../styles/Home.css';
import GradeIcon from '@material-ui/icons/Grade';
import MovieIcon from '@material-ui/icons/Movie';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const Trailers = dynamic(() => import('./Trailers'))

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

  const addFavourite = (id) => {
    let newState = [...personal.favourites];
    newState[newState.length] = id
    let unique = [...new Set(newState)];
    setPersonal({ ...personal, favourites: unique })
  }

  const watchLater = (id) => {
    let newState = [...personal.watchLater];
    newState[newState.length] = id
    let unique = [...new Set(newState)];
    setPersonal({ ...personal, watchLater: unique })
  }

  const callHome = () => {
    setMovieLists(movies)
  }

  const callFavourites = () => {
    let newList = movies.filter(element => { return personal.favourites.includes(element.id) })
    setMovieLists(newList)
  }

  const callWatchLater = () => {
    let newList = movies.filter(element => { return personal.watchLater.includes(element.id) })
    setMovieLists(newList)
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
        <a onClick={() => callHome()}>Home</a>
        <a onClick={() => callFavourites()}>Favourites</a>
        <a onClick={() => callWatchLater()}>Watch Later</a>
      </div>
      <div className="movieList">
        {movieList.map((list, index) =>
          <div className="movieItem" key={index}>
            <div className="movieImage">
              <img 
                alt={list.title ? list.title : list.name}
                src={width > 1024 ? `https://image.tmdb.org/t/p/w220_and_h330_face/${list.poster_path}` : `https://image.tmdb.org/t/p/w200/${list.poster_path}`}
              />
            </div>
            <div className="movieName">{list.title ? list.title.substring(0, 26) : list.name.substring(0, 26)}</div>
            <div className="movieRelease">{moment(list.release_date).format("LL")}</div>
            <div className="movieLinks">
              <GradeIcon onClick={() => addFavourite(list.id)} style={{ color: personal.favourites.includes(list.id) ? "red" : "black", cursor: "pointer" }} />
              <WatchLaterIcon onClick={() => watchLater(list.id)} style={{ color: personal.watchLater.includes(list.id) ? "green" : "black", cursor: "pointer" }} />
              <MovieIcon onClick={() => ShowTrailer(list.id)} style={{ color: "blue", cursor: "pointer" }} />
            </div>
          </div>
        )}
      </div>

      {trailerData ? (
        <Suspense>
          <Trailers videos={videos} width={width} setTrailerData={setTrailerData} />
        </Suspense>
      ) : <Fragment />}
    </div>
  );
}

export default Home;