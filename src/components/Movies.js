import moment from 'moment';
import '../styles/Movies.css';
import GradeIcon from '@material-ui/icons/Grade';
import MovieIcon from '@material-ui/icons/Movie';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

function Movies({ movieList, page, updatePage, width, personal, setPersonal, ShowTrailer }) {

    const addFavourite = (id, status) => {
        let newState = [...personal.favourites];
        let newArray = ''
        if (status === true) {
            newArray = newState.filter(item => item != id)
        } else {
            newState[newState.length] = id
            newArray = [...new Set(newState)];
        }
        setPersonal({ ...personal, favourites: newArray })
        updatePage(page, 'fav', newArray)
    }

    const watchLater = (id, status) => {
        let newState = [...personal.watchLater];
        let newArray = ''
        if (status === true) {
            newArray = newState.filter(item => item != id)
        } else {
            newState[newState.length] = id
            newArray = [...new Set(newState)];
        }
        setPersonal({ ...personal, watchLater: newArray })
        updatePage(page, 'wat', newArray)
    }

    return (
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
                        <GradeIcon title="Favourite" alt="Favourite" placement="start-top" onClick={() => addFavourite(list.id, personal.favourites.includes(list.id) ? true : false)} style={{ color: personal.favourites.includes(list.id) ? "red" : "black", cursor: "pointer" }} />
                        <WatchLaterIcon title="Watch Later" alt="Watch Later" placement="start-top" onClick={() => watchLater(list.id, personal.watchLater.includes(list.id) ? true : false)} style={{ color: personal.watchLater.includes(list.id) ? "green" : "black", cursor: "pointer" }} />
                        <MovieIcon title="Trailers" alt="Trailers" placement="start-top" onClick={() => ShowTrailer(list.id)} style={{ color: "blue", cursor: "pointer" }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movies;
