import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserReviews } from "../../api";

const Profile = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserReviews = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const reviewsData = await fetchUserReviews(user.id);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to load user reviews:", err);
        setError("Failed to load your reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadUserReviews();
  }, [user]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>You must be logged in to view this page.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://placehold.co/200x200?text=Profile"
                    alt="Profile"
                  />
                </div>
              </div>
              <h2 className="card-title text-2xl">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="text-sm text-gray-400 mt-2">
                Member since {formatDate(user.created_at)}
              </div>

              <div className="stats shadow mt-6 w-full">
                <div className="stat place-items-center">
                  <div className="stat-title">Reviews</div>
                  <div className="stat-value">{reviews.length}</div>
                </div>
              </div>

              <div className="card-actions mt-6">
                <button className="btn btn-outline btn-primary">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="md:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4 flex justify-between items-center">
                <span>Your Reviews</span>
                <Link to="/albums" className="btn btn-sm btn-primary">
                  Browse Albums
                </Link>
              </h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : error ? (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              ) : reviews.length === 0 ? (
                <div className="alert">
                  <span>You haven't written any reviews yet.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{review.title}</h3>
                            <p className="text-sm text-gray-500">
                              Album: {review.album?.title || "Unknown Album"}
                            </p>
                          </div>
                          <div className="rating rating-sm">
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
                        <p className="text-sm mt-2 line-clamp-2">
                          {review.body}
                        </p>
                        <div className="card-actions justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(review.created_at)}
                          </span>
                          <Link
                            to={`/reviews/${review.id}`}
                            className="btn btn-xs btn-ghost"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
