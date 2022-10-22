import { FunctionComponent } from 'react'
import moment from 'moment';
import './style.scss';
import { WEB_SIZE, createArray, MOVIE_NAME_LENGTH, FAVOURITES_SECTION, WATCHLATER_SECTION } from "../../utils"
import GradeIcon from '@material-ui/icons/Grade';
import MovieIcon from '@material-ui/icons/Movie';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

type Props = {
  movieList: [{
    id: number,
    title: string,
    name: string,
    release_date: string,
    poster_path: string
  }],
  page: string,
  updatePage: any,
  width: number,
  favourites: any,
  watchLater: any,
  setFavourites: any,
  setWatchLater: any,
  ShowTrailer: any
};

const Movies: FunctionComponent<Props> = ({ movieList, page, updatePage, width, favourites, watchLater, setFavourites, setWatchLater, ShowTrailer }) => {

  const addFavourite = (id: number, status: boolean) => {
    let newState = [...favourites];
    let newArray = createArray(status, newState, id)
    setFavourites(newArray)
    localStorage.setItem(FAVOURITES_SECTION, JSON.stringify(newArray))
    updatePage(page, FAVOURITES_SECTION, newArray)
  }

  const addWatchLater = (id: number, status: boolean) => {
    let newState = [...watchLater];
    let newArray = createArray(status, newState, id)
    setWatchLater(newArray)
    localStorage.setItem(WATCHLATER_SECTION, JSON.stringify(newArray))
    updatePage(page, WATCHLATER_SECTION, newArray)
  }

  return (
    <div className="movieList">
      {movieList.map((list, index: number) =>
        <div className="movieItem" key={index}>
          <div className="movieImage">
            <img
              data-testid={`${list.poster_path}:movie_image`}
              alt={list.title ? list.title : list.name}
              src={width > WEB_SIZE ? `https://image.tmdb.org/t/p/w220_and_h330_face/${list.poster_path}` : `https://image.tmdb.org/t/p/w200/${list.poster_path}`}
            />
          </div>
          <div className="movieName" data-testid={`${list.title ? list.title : list.name}:movie_name`}>{list.title ? list.title.substring(0, MOVIE_NAME_LENGTH) : list.name.substring(0, MOVIE_NAME_LENGTH)}</div>
          <div className="movieRelease">{moment(list.release_date).format("LL")}</div>
          <div className="movieLinks">
            <>
              <GradeIcon onClick={() => addFavourite(list.id, favourites.includes(list.id) ? true : false)} style={{ color: (favourites.includes(list.id) ? "red" : "black"), cursor: "pointer" }} />
              <WatchLaterIcon onClick={() => addWatchLater(list.id, watchLater.includes(list.id) ? true : false)} style={{ color: (watchLater.includes(list.id) ? "green" : "black"), cursor: "pointer" }} />
              <MovieIcon onClick={() => ShowTrailer(list.id)} style={{ color: "blue", cursor: "pointer" }} />
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;