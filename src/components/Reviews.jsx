import React, { useState, useEffect } from "react";
import { fetchReviews } from "../api";

const Reviews = ({ albumId, onBack, onSelectReview, album, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await fetchReviews(albumId);
        setReviews(reviewsData);

        // Check if current user has already reviewed this album
        if (currentUser) {
          const userReview = reviewsData.find(
            (review) => review.user_id === currentUser.id
          );
          setUserHasReviewed(!!userReview);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    loadReviews();
  }, [albumId, currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          Album Reviews
        </h2>
      </div>

      {album && (
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body flex flex-col items-center">
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
            <p className="text-gray-600 text-center mb-2">{album.artist}</p>
            <p className="text-sm text-gray-500 text-center">
              {album.release_date || "Unknown Year"}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={() => onBack()}
          className="btn btn-outline btn-primary mr-2"
        >
          Back to Albums
        </button>
        <button
          onClick={() => {
            const reviewEvent = new CustomEvent("add-review", {
              detail: { albumId },
            });
            window.dispatchEvent(reviewEvent);
          }}
          className="btn btn-primary"
          disabled={userHasReviewed}
        >
          {userHasReviewed ? "You've Reviewed This Album" : "Add a Review"}
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 shadow-lg rounded-lg bg-base-100 p-6">
          <p className="text-gray-500">
            No reviews for this album yet. Be the first to write one!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => onSelectReview(review)}
            >
              <div className="card-body">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="avatar mr-3">
                      <div className="w-8 h-8 rounded-full">
                        <img
                          src="https://placehold.co/100x100?text=User"
                          alt="User avatar"
                        />
                      </div>
                    </div>
                    <span className="font-semibold">
                      {review.username || "Anonymous"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.created_at)}
                  </span>
                </div>
                <div className="flex justify-center mb-2">
                  <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${review.id}`}
                        className="mask mask-star-2 bg-primary"
                        checked={review.rating === star}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {review.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 text-center">
                  {review.body.substring(0, 150)}
                  {review.body.length > 150 ? "..." : ""}
                </p>

                {currentUser && review.user_id === currentUser.id && (
                  <div className="mt-3 flex justify-center">
                    <span className="badge badge-primary">Your Review</span>
                  </div>
                )}

                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-sm btn-outline">
                    Read Full Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
