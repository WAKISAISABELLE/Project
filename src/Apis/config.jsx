import axios from 'axios';

// Base URL for your backend API 
// const BASE_URL = 'http://localhost:5000/api';

// Default axios configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Error handling
const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};

export { api, handleApiCall };