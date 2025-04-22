import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout components
import NavBar from "./components/layout/NavBar";

// Page components
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import { AlbumCollection } from "./components/AlbumCollection";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";

// Protected route component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // Parse the user from localStorage
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        // Clear invalid user data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar user={user} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/albums" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/albums" replace />
                ) : (
                  <Register onRegister={handleLogin} />
                )
              }
            />

            {/* Protected routes */}
            <Route
              path="/albums"
              element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <AlbumCollection user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-reviews"
              element={
                <ProtectedRoute isAuthenticated={!!user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
            <p>
              © 2025 Music Album Review App - A project by Matthias von Mach
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
