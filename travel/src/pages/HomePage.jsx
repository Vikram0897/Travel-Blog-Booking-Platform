import React, { useEffect, useState } from "react";
import "../pages/HomePage.css";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login");
  }
}, []);

  return (
    <div className="home-hero">

      {/* Background Layer */}
      <div className="hero-layer hero-bg">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
          alt="Explore the World"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Greeting Text */}
      <div className="hero-layer hero-text-container">
        <h1 className="welcome-title">
          {currentUser?.role === "admin"
            ? "Welcome , Admin!"
            : "Welcome to Luxury Travel!"}
        </h1>
        <p className="welcome-subtitle">
          {currentUser?.role === "admin"
            ? "Manage bookings and view all users"
            : "Explore premium destinations and unforgettable journeys."}
        </p>

        {/* Sparkle Effect */}
        <div className="luxury-elements">
          <span className="sparkle"></span>
          <span className="sparkle"></span>
          <span className="sparkle"></span>
          <span className="sparkle"></span>
        </div>
      </div>

    </div>
  );
}
