import React from "react";

const AddedAlbums = ({ albums, onSelectAlbum, onAddReview }) => {
  // Handle albums with no reviews
  const getAverageRating = (album) => {
    if (!album) return "No reviews yet";
    return album.average_rating != null
      ? album.average_rating.toFixed(1)
      : "No reviews yet";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Album Collection
      </h2>
      {!albums || albums.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No albums added yet. Search for an album to get started!
          </p>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center">
          {albums.map((album) => (
            <div
              key={album.id}
              className="w-full md:max-w-[300px] card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow border border-solid border-gray-400"
            >
              <figure
                className="pt-4 px-4 cursor-pointer transition-transform duration-300 hover:translate-y-[-5px]"
                onClick={() => onSelectAlbum(album.id)}
              >
                <img
                  src={
                    album.album_cover ||
                    "https://placehold.co/400x400?text=No+Image"
                  }
                  alt={album.title}
                  className="w-full h-48 object-cover rounded-lg max-w-150"
                />
              </figure>
              <div className="card-body items-center text-center py-4">
                {/* Removed star rating here and keeping only the numeric display */}
                <p className="text-sm font-medium mb-2 badge badge-primary badge-lg">
                  {getAverageRating(album)}
                </p>
                <h3 className="card-title text-center">{album.title}</h3>
                <p className="text-gray-600">{album.artist}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {album.release_date || "Unknown Year"}
                </p>
                <button
                  onClick={() => onAddReview(album.id)}
                  className="btn btn-sm btn-outline btn-primary mt-2"
                >
                  Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedAlbums;
