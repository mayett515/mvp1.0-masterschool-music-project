import React, { useState, useEffect } from "react";
import Search from "./Search";
import AddedAlbums from "./AddedAlbums";
import Reviews from "./Reviews";
import Review from "./Review";
import AddReview from "./AddReview";
import { fetchAlbums } from "../api";

export const Authorized = ({ user }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load/reload albums
  const loadAlbums = async () => {
    try {
      setLoading(true);
      const albumsData = await fetchAlbums();
      setAlbums(albumsData);
    } catch (error) {
      console.error("Failed to load albums:", error);
      setError("Failed to load albums. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load albums when component mounts
    loadAlbums();

    // Add event listener for "add-review" custom event
    const handleAddReviewEvent = (event) => {
      handleAddReview(event.detail.albumId);
    };

    window.addEventListener("add-review", handleAddReviewEvent);

    // Clean up
    return () => {
      window.removeEventListener("add-review", handleAddReviewEvent);
    };
  }, []);

  const handleAlbumAdded = (newAlbum) => {
    if (newAlbum && newAlbum.id) {
      // If we have a valid new album, add it to the state directly
      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    } else {
      // Otherwise reload all albums to ensure we have the latest data
      loadAlbums();
    }
  };

  const handleSelectAlbum = (albumId) => {
    setSelectedAlbumId(albumId);
    setSelectedReview(null);
    setIsAddingReview(false);
  };

  const handleSelectReview = (review) => {
    setSelectedReview(review);
  };

  const handleAddReview = (albumId) => {
    setSelectedAlbumId(albumId);
    setIsAddingReview(true);
    setSelectedReview(null);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    setIsAddingReview(false);
    setSelectedReview(null);
  };

  const handleBackToReviews = () => {
    setIsAddingReview(false);
    setSelectedReview(null);
  };

  const handleReviewAdded = () => {
    // Reload albums to get updated ratings
    loadAlbums();
    // Go back to reviews
    setIsAddingReview(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-2xl mx-auto mt-10">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 select-none">
          Music Album Collection
        </h1>
        <p className="text-lg text-gray-500">
          Welcome, {user?.username || "music lover"}! Start building your
          collection.
        </p>
        <div className="divider max-w-md mx-auto"></div>
      </div>

      {/* Always show search bar */}
      <div className="max-w-xl mx-auto mb-8">
        {!selectedAlbumId && <Search onAlbumAdded={handleAlbumAdded} />}
      </div>

      {/* Dynamic content area */}
      <div className="mt-8">
        {!selectedAlbumId && (
          <AddedAlbums
            albums={albums}
            onSelectAlbum={handleSelectAlbum}
            onAddReview={handleAddReview}
          />
        )}

        {selectedAlbumId && !isAddingReview && !selectedReview && (
          <Reviews
            albumId={selectedAlbumId}
            onBack={handleBackToAlbums}
            onSelectReview={handleSelectReview}
            album={albums.find((album) => album.id === selectedAlbumId)}
            currentUser={user}
          />
        )}

        {selectedAlbumId && selectedReview && (
          <Review
            review={selectedReview}
            onBack={handleBackToReviews}
            currentUser={user}
          />
        )}

        {selectedAlbumId && isAddingReview && (
          <AddReview
            albumId={selectedAlbumId}
            onReviewAdded={handleReviewAdded}
            onBack={handleBackToReviews}
            album={albums.find((album) => album.id === selectedAlbumId)}
            currentUser={user}
          />
        )}
      </div>
    </div>
  );
};
