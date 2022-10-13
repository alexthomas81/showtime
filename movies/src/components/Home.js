import { Fragment, Suspense, useEffect, useState } from 'react';
import '../styles/Home.css';

function Home() {

  let APIKEY = '44690770c7218f35a73e5bdda03ad0bd'
  const [countries, setCountries] = useState([])
  const [countryname, setCountry] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (countries.length == 0) {
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`)
        .then(response => response.json())
        .then(data => setCountries(data.results));
    }
  }, [countries])

  const newList = countryname ? countries.filter(element => { return element.title ? element.title.toLowerCase().includes(countryname.toLowerCase()) : element.name.toLowerCase().includes(countryname.toLowerCase()) }) : countries;

  const handleCountrySearch = (e) => {
    setCountry(e.target.value)
  }

  const ShowTrailer = (path) => {
    fetch(`https://api.themoviedb.org/3/movie/${path}/videos?api_key=${APIKEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setVideos(data.results)
          setAlertData(path)
        } else {
          setAlertData(null)
        }
      })
      .catch(error => {
        setAlertData(null)
        throw (error);
      })
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          Show Time!
        </p>
      </header>
      <div>
        <input type="text" id="searchCountry" onChange={handleCountrySearch} />
      </div>
      <div className="movieList">
        {newList.map((list, index) =>
          <div className="movieItem" key={index}>
            <div className="movieImage"><img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${list.poster_path}`} /></div>
            <div className="movieName">{list.title ? list.title : list.name}</div>
            <div className="movieRelease">Release : {list.release_date}</div>
            <div className="movieLinks">
              Star -
              Watch Later -
              <a onClick={() => ShowTrailer(list.id)}> Trailers </a>
            </div>
          </div>
        )}
      </div>

      {alertData ? (
        <Suspense>
          <div>
            {videos.length > 0 && videos.map((list, index) =>
              <div key={index}>
                <iframe type="text/html"
                  width="200"
                  height="200"
                  src={`http://www.youtube.com/embed/${list.key}`}
                  frameborder="0">
                </iframe>
              </div>
            )}
          </div>
        </Suspense>
      ) : <Fragment />}
    </div>
  );
}

export default Home;
