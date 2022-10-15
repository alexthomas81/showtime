export const APIURL = 'https://api.themoviedb.org/3/'
export const APIKEY = '44690770c7218f35a73e5bdda03ad0bd'
export const webSize = 1024
export const webFrame = 300
export const mobFrame = 190
export const movieNameLength = 26
export const homePage = 'HOME'
export const favouritesPage = 'FAVOURITE'
export const watchLaterPage = 'WATCHLATER'
export const favouritesSection = 'FAV'
export const watchLaterSection = 'WAT'

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