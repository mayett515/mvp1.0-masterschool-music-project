import axios from "axios";

const API_URL = "https://musicproject-fs7h.onrender.com/api";

export const fetchAlbums = async () => {
  const response = await axios.get(`${API_URL}/albums`);
  return response.data;
};

export const addAlbum = async (albumData) => {
  const response = await axios.post(`${API_URL}/albums`, albumData);
  return response.data;
};

export const fetchReviews = async (albumId) => {
  // First, try to get reviews with album_id parameter
  try {
    const response = await axios.get(`${API_URL}/reviews?album_id=${albumId}`);
    // If the backend doesn't filter by album_id, we'll filter on the client side
    return response.data.filter((review) => review.album_id === albumId);
  } catch {
    // If the endpoint doesn't support filtering, fetch all reviews and filter on client
    const response = await axios.get(`${API_URL}/reviews`);
    return response.data.filter((review) => review.album_id === albumId);
  }
};

export const addReview = async (reviewData) => {
  // Ensure rating is a number
  const formattedData = {
    ...reviewData,
    rating: Number(reviewData.rating),
  };

  const response = await axios.post(`${API_URL}/reviews`, formattedData);
  return response.data;
};

export const fetchReviewById = async (reviewId) => {
  const response = await axios.get(`${API_URL}/reviews/${reviewId}`);
  return response.data;
};
