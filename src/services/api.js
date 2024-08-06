import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Change to your backend URL

export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};
