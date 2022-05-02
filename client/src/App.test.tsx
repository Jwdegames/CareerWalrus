import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Magnify} from './magnifying/Magnifying';

test('renders learn react link', () => {
  render(<Magnify />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
