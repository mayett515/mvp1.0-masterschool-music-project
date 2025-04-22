import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">About This Project</h1>
        <div className="divider max-w-md mx-auto"></div>
      </div>

      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">
            The Music Album Review App
          </h2>
          <p className="mb-4">
            This application was created to help music enthusiasts track,
            review, and discover albums they love. Built with React and Flask,
            this app provides a simple and intuitive interface for managing your
            music collection and sharing your thoughts.
          </p>
          <p className="mb-4">
            The app uses the Discogs API to fetch accurate album information,
            including cover art, release dates, and other metadata. This ensures
            that you have access to comprehensive information about the albums
            you're interested in.
          </p>

          <div className="divider"></div>

          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Search for albums by title and artist</li>
            <li>Add albums to your collection</li>
            <li>Write and read detailed reviews</li>
            <li>Rate albums on a 5-star scale</li>
            <li>View album details including cover art and release year</li>
            <li>Discover what others think about your favorite music</li>
          </ul>

          <div className="divider"></div>

          <h2 className="text-2xl font-bold mb-4">About the Creator</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://i.ibb.co/tpq2rHRZ/1000030735-1.jpg"
                  alt="Matthias von Mach"
                />
              </div>
            </div>
            <div>
              <p className="mb-2">
                Hi! I'm a passionate developer and music lover who created this
                application as part of my journey to build useful web
                applications that solve real problems.
              </p>
              <p>
                I believe in the power of music to connect people, and I hope
                this app helps you discover new albums and share your musical
                experiences with others.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
