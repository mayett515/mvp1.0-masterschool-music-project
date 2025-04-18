import React, { useState } from "react";
import { addAlbum } from "../api";

const Search = ({ onAlbumAdded }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist) {
      setError("Please enter both album title and artist");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("adding");
      const addedAlbum = await addAlbum({ title, artist });
      console.log("added", addedAlbum);
      onAlbumAdded(addedAlbum); // Pass the newly added album to the parentdddd
      setTitle("");
      setArtist("");
    } catch (error) {
      console.error("Failed to add album:", error);

      // Check for specific error types from API
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to add album. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-center mx-auto mb-4">Add an Album</h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="form-control w-full max-w-md mb-3">
            <label className="label justify-center">
              <span className="label-text">Album Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full text-center"
              placeholder="Enter album title"
            />
          </div>

          <div className="form-control w-full max-w-md mb-5">
            <label className="label justify-center">
              <span className="label-text">Artist</span>
            </label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="input input-bordered w-full text-center"
              placeholder="Enter artist name"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add Album"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
