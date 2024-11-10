import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Correct import for jest-dom
import App from './App';

test('renders login page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

test('renders registration page when navigating to /register', () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );
  

  const registerHeading = screen.getByRole('heading', { name: /register/i });
  expect(registerHeading).toBeInTheDocument();
});
