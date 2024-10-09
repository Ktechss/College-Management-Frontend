import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; // Replace with your actual backend URL

// Function to authenticate user
const authenticate = async ({ email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/authenticate`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Authentication failed');
    }
};

export default {
    authenticate,
};
