import React, { useState } from "react";
import { addReview } from "../api";

const AddReview = ({ albumId, onReviewAdded, onBack, album, currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || rating === 0) {
      setError("Please fill all fields and provide a rating");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Make sure to convert rating to a number before sending
      const reviewData = {
        title,
        body,
        rating: Number(rating), // Ensure rating is a number
        album_id: albumId,
        // The backend will use the authenticated user's ID
      };

      await addReview(reviewData);
      onReviewAdded();
    } catch (error) {
      console.error("Failed to submit review:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="btn btn-circle mr-4 hover:bg-primary hover:text-white transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-center flex-grow pr-12">
          Add Review
        </h2>
      </div>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body flex flex-col items-center">
          {album && (
            <div className="flex flex-col items-center mb-4">
              <div className="w-48 h-48 overflow-hidden rounded-lg shadow-md mb-4">
                <img
                  src={
                    album.album_cover ||
                    "https://placehold.co/400x400?text=No+Image"
                  }
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-center">{album.title}</h3>
              <p className="text-gray-600 text-center">{album.artist}</p>
            </div>
          )}

          {error && (
            <div className="alert alert-error mb-4 w-full">
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <div className="form-control w-full mb-4">
              <label className="label justify-center">
                <span className="label-text text-lg font-medium">
                  Your Rating
                </span>
              </label>
              <div className="rating rating-lg flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-primary"
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                ))}
              </div>
            </div>

            <div className="form-control w-full mb-4">
              <label className="label justify-center">
                <span className="label-text text-lg font-medium">
                  Review Title
                </span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full text-center"
                placeholder="Enter a title for your review"
              />
            </div>

            <div className="form-control w-full mb-6">
              <label className="label justify-center">
                <span className="label-text text-lg font-medium">
                  Write Your Review Here
                </span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="textarea textarea-bordered h-40 text-center w-full resize-none"
                placeholder="Share your thoughts on this album"
                rows={5}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-wide"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
