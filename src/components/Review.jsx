import React from "react";

const Review = ({ review, onBack, currentUser }) => {
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

  const isAuthor = currentUser && review.user_id === currentUser.id;

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
          Review Details
        </h2>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="avatar mr-3">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src="https://placehold.co/100x100?text=User"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div>
                <span className="font-semibold block">
                  {review.username || "Anonymous"}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(review.created_at)}
                </span>
              </div>
            </div>

            {isAuthor && (
              <span className="badge badge-primary">Your Review</span>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <div className="rating rating-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-primary"
                  checked={review.rating === star}
                  readOnly
                />
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-6">
            {review.title}
          </h3>

          <div className="prose max-w-none">
            {review.body.split("\n").map((paragraph, index) => (
              <p key={index} className="text-center">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="card-actions justify-center mt-8">
            <button onClick={onBack} className="btn btn-primary">
              Back to Reviews
            </button>

            {isAuthor && (
              <button className="btn btn-outline btn-error">
                Delete Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
