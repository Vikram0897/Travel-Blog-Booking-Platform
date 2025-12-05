import React from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="policy-wrapper fade-in">
      <div className="floating-bubble bubble1"></div>
      <div className="floating-bubble bubble2"></div>

      <div className="policy-card">
        <h1>Privacy Policy</h1>
        <p>
          We care about your privacy. This policy explains how we handle your
          personal data.
        </p>

        <h2>1. Data We Collect</h2>
        <p>Name, contact details, travel information, and payment data.</p>

        <h2>2. Use of Data</h2>
        <ul>
          <li>Booking verification</li>
          <li>Customer support</li>
          <li>Payments and billing</li>
        </ul>

        <h2>3. Protection</h2>
        <p>Your data is never sold or shared with unauthorized services.</p>

        <h2>4. Third Party</h2>
        <p>Hotels/Transport vendors receive ONLY booking-related info.</p>

        <h2>5. Cookies</h2>
        <p>Used to improve website experience.</p>
      </div>
    </div>
  );
}
