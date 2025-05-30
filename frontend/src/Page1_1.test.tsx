import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Page1_1 contains Link components
import Page1_1 from './Page1_1';

// Mock environment variable
const mockBackendUrl = 'http://localhost:3001';
process.env.REACT_APP_BACKEND_URL = mockBackendUrl;

describe('Page1_1', () => {
  // Mock window.location.href
  let originalLocation: Location;
  beforeEach(() => {
    originalLocation = window.location;
    // @ts-ignore
    delete window.location;
    window.location = { ...originalLocation, href: '' } as Location;
    jest.spyOn(window.location, 'assign'); // if assign is used
  });

  afterEach(() => {
    window.location = originalLocation; // Restore original window.location
    jest.restoreAllMocks();
  });
  
  test('renders Sign in with Google button', () => {
    render(
      <BrowserRouter>
        <Page1_1 />
      </BrowserRouter>
    );
    const googleButton = screen.getByText(/Sign in with Google/i);
    expect(googleButton).toBeInTheDocument();
  });

  test('clicking Sign in with Google button redirects to the correct backend URL', () => {
    render(
      <BrowserRouter>
        <Page1_1 />
      </BrowserRouter>
    );
    const googleButton = screen.getByText(/Sign in with Google/i);
    fireEvent.click(googleButton);

    // Check if window.location.href was set correctly
    // Page1_1 directly sets window.location.href
    expect(window.location.href).toBe(`${mockBackendUrl}/api/auth/google`);
  });

  test('renders Sign in with Kakao button', () => {
    render(
      <BrowserRouter>
        <Page1_1 />
      </BrowserRouter>
    );
    const kakaoButton = screen.getByText(/카카오 계정으로 로그인/i);
    expect(kakaoButton).toBeInTheDocument();
  });

  test('clicking Sign in with Kakao button redirects to the correct backend URL', () => {
    render(
      <BrowserRouter>
        <Page1_1 />
      </BrowserRouter>
    );
    const kakaoButton = screen.getByText(/카카오 계정으로 로그인/i);
    fireEvent.click(kakaoButton);
    expect(window.location.href).toBe(`${mockBackendUrl}/api/auth/login/kakao`);
  });
});
