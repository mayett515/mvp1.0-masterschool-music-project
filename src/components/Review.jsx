import React from "react";

const Review = ({ review, onBack }) => {
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
          <div className="text-gray-500 text-sm text-center mt-6">
            {new Date(review.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="card-actions justify-center mt-4">
            <button onClick={onBack} className="btn btn-primary">
              Back to Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
