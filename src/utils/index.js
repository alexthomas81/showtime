export const APIURL = 'https://api.themoviedb.org/3/'
export const APIKEY = '44690770c7218f35a73e5bdda03ad0bd'
export const WEB_SIZE = 1024
export const WEB_FRAME = 300
export const MOB_FRAME = 190
export const MOVIE_NAME_LENGTH_DESKTOP = 26
export const MOVIE_NAME_LENGTH_MOBILE = 18
export const HOME_PAGE = 'HOME'
export const FAVOURITES_PAGE = 'FAVOURITE'
export const WATCHLATER_PAGE = 'WATCHLATER'
export const FAVOURITES_SECTION = 'FAV'
export const WATCHLATER_SECTION = 'WAT'

export const createArray = (status, newState, id) => {
    let newArray = ''
    if (status === true) {
        newArray = newState.filter(item => item != id)
    } else {
        newState[newState.length] = id
        newArray = [...new Set(newState)];
    }
    return newArray
}