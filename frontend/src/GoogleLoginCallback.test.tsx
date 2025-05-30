import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import GoogleLoginCallback from './GoogleLoginCallback';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.alert
global.alert = jest.fn();

// Mock environment variable
const mockBackendUrl = 'http://localhost:3001';
process.env.REACT_APP_BACKEND_URL = mockBackendUrl;

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('GoogleLoginCallback', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockedAxios.get.mockClear();
    (global.alert as jest.Mock).mockClear();
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    // GoogleLoginCallback uses useNavigate, so it needs to be within a Router context
    // We use MemoryRouter to control the initial entries if needed, though not strictly necessary here
    // as the component itself navigates away.
    render(
      <MemoryRouter initialEntries={['/auth/google/callback_success']}>
        <Routes>
            <Route path="/auth/google/callback_success" element={<GoogleLoginCallback />} />
            {/* Define other routes that might be navigated to, for completeness */}
            <Route path="/planlist" element={<div>Plan List Page</div>} />
            <Route path="/page1_1" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('Scenario 1: Successful user data fetch', async () => {
    const mockUserData = { id: 'user123', name: 'Test User', email: 'test@example.com' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });

    renderComponent();

    expect(screen.getByText(/Loading your profile.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${mockBackendUrl}/api/auth/status`,
        { withCredentials: true }
      );
    });
    
    await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUserData));
        expect(localStorageMock.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/planlist');
    });
    
    expect(global.alert).not.toHaveBeenCalled();
  });

  test('Scenario 2: Failed user data fetch (API error)', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderComponent();

    expect(screen.getByText(/Loading your profile.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${mockBackendUrl}/api/auth/status`,
        { withCredentials: true }
      );
    });

    await waitFor(() => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('isLoggedIn', 'false');
    });
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Google login failed. Please try again.');
    });

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/page1_1');
    });
  });

  test('Scenario 3: User data fetch successful but no user data in response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null }); // Or { data: {} }

    renderComponent();

    expect(screen.getByText(/Loading your profile.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('isLoggedIn', 'false');
      expect(global.alert).toHaveBeenCalledWith('Google login failed: Could not retrieve user information.');
    });
    
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/page1_1');
    });
  });
});
