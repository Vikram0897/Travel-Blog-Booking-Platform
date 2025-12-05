import React from "react";
import "./TermsPage.css";

export default function TermsPage() {
  return (
    <div className="policy-wrapper fade-in">
      <div className="floating-bubble bubble1"></div>
      <div className="floating-bubble bubble2"></div>
      <div className="floating-bubble bubble3"></div>

      <div className="policy-card">
        <h1>Terms & Conditions</h1>
        <p>
          Welcome to our travel booking platform. By accessing our services, you
          agree to follow all the terms listed below.
        </p>

        <h2>1. Booking Confirmation</h2>
        <p>
          All bookings require partial or full payment. We reserve the right to
          cancel incomplete bookings.
        </p>

        <h2>2. User Responsibilities</h2>
        <p>
          You must provide accurate details such as name, traveler data, and
          payment information.
        </p>

        <h2>3. Pricing</h2>
        <p>
          Prices may change based on availability, season, or provider
          variations.
        </p>

        <h2>4. Documents Required</h2>
        <p>You must carry valid travel documentation (ID/Passport/Visa).</p>

        <h2>5. Limitations</h2>
        <p>
          We are not liable for natural calamities, airline delays, or provider
          issues.
        </p>
      </div>
    </div>
  );
}
