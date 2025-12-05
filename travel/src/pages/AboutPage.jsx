import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Travel Booking Website</h1>

      <p className="about-text">
        Welcome to our modern and user-friendly trip booking platform!  
        Our goal is to make travel easier, faster, and more enjoyable for every explorer.
        Here, users can browse tourist places, view packages, check hotel and food facilities,
        calculate package costs, and book trips instantly.
      </p>

      <p className="about-text">
        The platform is also equipped with a powerful Admin Dashboard where all bookings
        update live. This helps us maintain a smooth experience for all travelers.
      </p>

      <h2 className="section-title">Admin Details</h2>

      <p className="about-text">
        <strong>Admin Name:</strong> Vikram <br />
        <strong>Instagram:</strong> <a href="https://www.instagram.com/vikram_sparx/">@vikram_sparx</a> <br />
        <strong>Contact for Enquiry:</strong> 9876556780
      </p>

      <p className="about-text">
        Thank you for choosing us to be part of your travel journey.  
        Let's explore the world together!
      </p>
    </div>
  );
};

export default AboutPage;
