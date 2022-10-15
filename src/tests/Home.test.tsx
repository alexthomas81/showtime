import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('feel good!', () => {
  render(<Home />);
  const linkElement = screen.getByText(/feel good!/i);
  expect(linkElement).toBeInTheDocument();
});
