import { render, screen } from "@testing-library/react"
import Movies from "../components/Movies"

const TrueProps: any = {
  movieList: [{
    id: 616820,
    title: 'Halloween Ends',
    name: 'Halloween Ends',
    release_date: '2022-10-12',
    poster_path: '/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg'
  },
  {
    id: 84773,
    title: 'The Lord of the Rings',
    name: 'The Lord of the Rings',
    release_date: '2022-10-17',
    poster_path: '/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg'
  }],
  page: 'HOME_PAGE',
  updatePage: '',
  width: 1200,
  favourites: [],
  watchLater: [],
  setFavourites: '',
  setWatchLater: '',
  ShowTrailer: ''
}

const FalseProps: any = {
  movieList: [{
    id: 616820,
    title: 'New',
    name: 'New',
    release_date: '2022-10-12',
    poster_path: '/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg'
  },
  {
    id: 84773,
    title: 'Old',
    name: 'Old',
    release_date: '2022-10-17',
    poster_path: '/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg'
  }],
  page: 'HOME_PAGE',
  updatePage: '',
  width: 1200,
  favourites: [],
  watchLater: [],
  setFavourites: '',
  setWatchLater: '',
  ShowTrailer: ''
}

test("Halloween Ends movie check", async () => {
  render(<Movies {...TrueProps} />)
  expect(screen.queryByTestId("Halloween Ends:movie_name")).toBeInTheDocument()
})

test("The Lord of the Rings movie check", async () => {
  render(<Movies {...TrueProps} />)
  expect(screen.queryByTestId("The Lord of the Rings:movie_name")).toBeInTheDocument()
})

test("Halloween Ends movie image check", async () => {
  render(<Movies {...TrueProps} />)
  expect(screen.queryByTestId("/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg:movie_image")).toBeInTheDocument()
})

test("The Lord of the Rings movie image check", async () => {
  render(<Movies {...TrueProps} />)
  expect(screen.queryByTestId("/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg:movie_image")).toBeInTheDocument()
})

test("Halloween Ends movie not check", async () => {
  render(<Movies {...FalseProps} />)
  expect(screen.queryByTestId("Halloween Ends:movie_name")).not.toBeInTheDocument()
})

test("The Lord of the Rings movie not check", async () => {
  render(<Movies {...FalseProps} />)
  expect(screen.queryByTestId("The Lord of the Rings:movie_name")).not.toBeInTheDocument()
})