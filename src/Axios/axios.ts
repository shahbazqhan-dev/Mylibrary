    import axios from 'axios';

    const axiosInstance = axios.create({
      baseURL: 'https://openlibrary.org/search.json?q=the+lord+of+the+rings', // Replace with your API base URL
      timeout: 5000, // Optional: request timeout in milliseconds
      headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
      },
    });

    // Optional: Add request or response interceptors
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        // Handle global errors here (e.g., show a toast message)
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );

    export default axiosInstance;