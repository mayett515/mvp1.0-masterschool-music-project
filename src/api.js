import axios from "axios";

const API_URL = "https://musicproject-fs7h.onrender.com/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Album API
export const fetchAlbums = async () => {
  try {
    const response = await api.get("/albums");
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};

export const addAlbum = async (albumData) => {
  try {
    const response = await api.post("/albums", albumData);
    return response.data;
  } catch (error) {
    console.error("Error adding album:", error);
    throw error;
  }
};

// Review API
export const fetchReviews = async (albumId) => {
  try {
    // First, try to get reviews with album_id parameter
    const response = await api.get(`/reviews?album_id=${albumId}`);
    // If the backend doesn't filter by album_id, we'll filter on the client side
    return response.data.filter((review) => review.album_id === albumId);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // If the endpoint doesn't support filtering, fetch all reviews and filter on client
    const response = await api.get("/reviews");
    return response.data.filter((review) => review.album_id === albumId);
  }
};

export const fetchUserReviews = async (userId) => {
  try {
    const response = await api.get(`/reviews?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

export const addReview = async (reviewData) => {
  try {
    // Ensure rating is a number
    const formattedData = {
      ...reviewData,
      rating: Number(reviewData.rating),
    };

    const response = await api.post("/reviews", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const fetchReviewById = async (reviewId) => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

export default api;
