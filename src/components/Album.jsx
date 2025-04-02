import React from "react";

const Album = ({ album, onSelect, onAddReview }) => {
  // Function to render star rating
  const renderStars = () => {
    // Check for either rating or average_rating (from API)
    const albumRating = album.rating || album.average_rating;

    if (!albumRating)
      return <span className="text-gray-400">No ratings yet</span>;

    const stars = [];
    const fullStars = Math.floor(albumRating);
    const halfStar = albumRating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow duration-300">
      <figure
        className="h-48 overflow-hidden cursor-pointer"
        onClick={() => onSelect(album.id)}
      >
        <img
          src={
            album.album_cover || "https://placehold.co/400x400?text=No+Image"
          }
          alt={album.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-lg line-clamp-1">{album.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{album.artist}</p>
        <p className="text-xs">
          {album.release_date || "Unknown release date"}
        </p>
        <div className="mt-2">{renderStars()}</div>
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddReview(album.id);
            }}
          >
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Album;
