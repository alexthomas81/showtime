import { Fragment, Suspense, useEffect, useState } from 'react';
import moment from 'moment';
import '../styles/Home.css';
import CloseIcon from '@material-ui/icons/Close';
import GradeIcon from '@material-ui/icons/Grade';
import MovieIcon from '@material-ui/icons/Movie';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

function Home() {
  const [width, setWidth] = useState(window.innerWidth);
  let APIURL = 'https://api.themoviedb.org/3/'
  let APIKEY = '44690770c7218f35a73e5bdda03ad0bd'
  const [movies, setMovies] = useState([])
  const [filmname, setFilm] = useState(null)
  const [trailerData, setTrailerData] = useState(null)
  const [videos, setVideos] = useState([])
  const [favourites, setFavourites] = useState([])
  const [watch, setWatch] = useState([])
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
        .then(data => setMovies(data.results));
    }
  }, [movies, APIKEY, APIURL])

  const newList = filmname ? movies.filter(element => { return element.title ? element.title.toLowerCase().includes(filmname.toLowerCase()) : element.name.toLowerCase().includes(filmname.toLowerCase()) }) : movies;
  const handleSearchMovie = (e) => {
    setFilm(e.target.value)
  }

  const handleClose = e => {
    e.stopPropagation();
    setTrailerData(null);
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
    let newState = [...favourites];
    newState[newState.length] = id
    let unique = [...new Set(newState)];
    setFavourites(unique)
  }

  const watchLater = (id) => {
    let newState = [...watch];
    newState[newState.length] = id
    let unique = [...new Set(newState)];
    setWatch(unique)
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <p>Show Time!</p>
      </header>
      <div>
        <input type="text" className="searchMovie" id="searchMovie" onChange={handleSearchMovie} />
      </div>
      <div className="movieList">
        {newList.map((list, index) =>
          <div className="movieItem" key={index}>
            <div className="movieImage">
              <img
                alt={list.title ? list.title : list.name}
                src={width > 1024 ? `https://image.tmdb.org/t/p/w220_and_h330_face/${list.poster_path}` : `https://image.tmdb.org/t/p/w300/${list.poster_path}`}
              />
            </div>
            <div className="movieName">{list.title ? list.title.substring(0, 30) : list.name.substring(0, 30)}</div>
            <div className="movieRelease">{moment(list.release_date).format("LL")}</div>
            <div className="movieLinks">
              <GradeIcon onClick={() => addFavourite(list.id)} style={{ color: favourites.includes(list.id) ? "red" : "black", cursor: "pointer" }} />
              <WatchLaterIcon onClick={() => watchLater(list.id)} style={{ color: watch.includes(list.id) ? "green" : "black", cursor: "pointer" }} />
              <MovieIcon onClick={() => ShowTrailer(list.id)} style={{ color: "blue", cursor: "pointer" }} />
            </div>
          </div>
        )}
      </div>

      {trailerData ? (
        <Suspense>
          <div className="app-checkout-exp-container">
            <div className="app-checkout-exp-tooltip">
              <CloseIcon style={{ color: "blue", cursor: "pointer" }} onClick={handleClose} />
              <div className="detail">
                {videos.length > 0 && videos.slice(0, width > 1024 ? 4 : 2).map((list, index) =>
                  <div className="detailitem" key={index}>
                    <iframe
                      type="text/html"
                      title={list.id}
                      width={width > 1024 ? 200 : 150}
                      height="200"
                      src={`http://www.youtube.com/embed/${list.key}`}
                      frameBorder="0">
                    </iframe>
                  </div>
                )}
              </div>
              {videos.length === 0 ? 'No trailers found.' : ''}
            </div>
          </div>
        </Suspense>
      ) : <Fragment />}
    </div>
  );
}

export default Home;
