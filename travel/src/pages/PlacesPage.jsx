import React from "react";
import { packages } from "../data/packages";
import { useNavigate } from "react-router-dom";
import "./PlacesPage.css"; // You can reuse similar CSS to PackagesPage

export default function PlacesPage() {
  const navigate = useNavigate();

  return (
    <div className="packages-container">
      <h1 className="page-title">Our Destinations</h1>
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.title} className="package-image" />
            
            {/* Show place name */}
            <div className="package-content">
              <h2 className="package-title">{pkg.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
