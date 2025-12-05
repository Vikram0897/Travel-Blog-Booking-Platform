import React, { useState, useEffect } from "react";
import { packages } from "../data/packages";
import { useNavigate } from "react-router-dom";
import "./PackagesPage.css";

export default function PackagesPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const handleBookNow = (pkgId) => {
    navigate(`/booking?pkgId=${pkgId}`);
  };

  return (
    <div className="packages-container">
      <h1 className="page-title">Our Travel Packages</h1>
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img className="package-image" src={pkg.image} alt={pkg.title} />

            <div className="package-content">
              <h2 className="package-title">{pkg.title}</h2>
              <p className="package-desc">{pkg.description}</p>

              {/* Hotel Info */}
              <div className="hotel-box">
                <p><strong>Hotel:</strong> {pkg.hotelName}</p>
                <p><strong>Location:</strong> {pkg.hotelLocation}</p>
                <a
                  href={pkg.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  View on Map
                </a>
              </div>

              {/* Price */}
              <div className="price-box">
                <p className="price-text">₹{pkg.pricePerPersonPerDay}/person/day</p>
              </div>

              {/* Highlights */}
              <div className="highlights-box">
                <strong>Highlights:</strong> {pkg.highlights.join(", ")}
              </div>

              {/* Book Now Button for users only */}
              {currentUser && currentUser.role !== "admin" && (
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(pkg.id)}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
