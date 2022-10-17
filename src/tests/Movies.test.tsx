import { render, screen } from "@testing-library/react"
import Movies from "../components/Movies"

const Props: any = {
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

test("Halloween Ends movie check", async () => {
  render(<Movies {...Props} />)
  expect(screen.queryByTestId("Halloween Ends:movie_name")).toBeInTheDocument()
})

test("The Lord of the Rings movie check", async () => {
  render(<Movies {...Props} />)
  expect(screen.queryByTestId("The Lord of the Rings:movie_name")).toBeInTheDocument()
})

test("Halloween Ends movie image check", async () => {
  render(<Movies {...Props} />)
  expect(screen.queryByTestId("/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg:movie_image")).toBeInTheDocument()
})

test("The Lord of the Rings movie image check", async () => {
  render(<Movies {...Props} />)
  expect(screen.queryByTestId("/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg:movie_image")).toBeInTheDocument()
})