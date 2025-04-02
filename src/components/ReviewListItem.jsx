import React from "react";

const ReviewListItem = ({ review, onSelect }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to render star rating
  const renderStars = (rating) => {
    if (!rating) return null;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={`full-${i}`} className="text-yellow-400">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        );
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
      onClick={() => onSelect(review)}
    >
      <div className="card-body p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="font-medium text-lg">{review.title}</div>
          <div className="text-sm text-gray-500">
            {formatDate(review.created_at)}
          </div>
        </div>
        <div className="mt-3">{renderStars(review.rating)}</div>
        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {review.body}
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-sm btn-ghost">Read more</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewListItem;
