import { render, screen } from "@testing-library/react"
import Home from "../components/Home"

test('Home page head', () => {
  render(<Home />);
  const headElement = screen.getByText(/feel good!/i);
  expect(headElement).toBeInTheDocument();
});

test('Home page search', () => {
  render(<Home />);
  expect(screen.queryByTestId("searchMovie")).toBeInTheDocument()
});

test('Home page links', () => {
  render(<Home />);
  const linkElement1 = screen.getByText(/Favourites/i);
  expect(linkElement1).toBeInTheDocument();

  const linkElement2 = screen.getByText(/Watch Later/i);
  expect(linkElement2).toBeInTheDocument();
});