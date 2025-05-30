import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Fallback if not set

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        // Assuming the session is already established by the backend redirect
        // and this endpoint returns the current logged-in user.
        // The backend should have an endpoint like '/api/auth/status' or '/api/users/me'
        // For this example, let's assume it's '/api/auth/status'
        const response = await axios.get(`${backend_url}/api/auth/status`, {
          withCredentials: true, // Important to send cookies for session verification
        });

        if (response.data && response.data.id) {
          // Assuming the response data is the user object or contains it
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('isLoggedIn', 'true'); // Simple flag for logged-in state

          // Redirect to the main application page
          navigate('/planlist');
        } else {
          // No user data in response, or response format is unexpected
          localStorage.removeItem('user');
          localStorage.setItem('isLoggedIn', 'false');
          window.alert('Google login failed: Could not retrieve user information.');
          navigate('/page1_1'); // Redirect to login page
        }
      } catch (error) {
        console.error('Error fetching user status after Google login:', error);
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        window.alert('Google login failed. Please try again.');
        navigate('/page1_1'); // Redirect to login page
      }
    };

    fetchUserStatus();
  }, [navigate, backend_url]);

  return (
    <div>
      <p>Loading your profile...</p>
      {/* You can add a spinner or a more sophisticated loading indicator here */}
    </div>
  );
};

export default GoogleLoginCallback;
