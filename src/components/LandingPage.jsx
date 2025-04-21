import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Music Album Review App</h1>
          <p className="py-6">
            Discover, track, and review your favorite music albums. Share your
            thoughts and see what others think about the albums you love.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/albums" className="btn btn-primary">
              Browse Albums
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="card-title">Find Albums</h3>
                  <p>Search for your favorite albums by title and artist</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="card-title">Write Reviews</h3>
                  <p>Share your thoughts and rate albums from 1-5 stars</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="card-title">Discover More</h3>
                  <p>Read other users' reviews and find new music to enjoy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
