import React from "react";
import "./RefundPolicy.css";

export default function RefundPolicy() {
  return (
    <div className="policy-wrapper fade-in">
      <div className="floating-bubble bubble1"></div>
      <div className="floating-bubble bubble3"></div>

      <div className="policy-card">
        <h1>Refund & Cancellation Policy</h1>
        <p>
          Our refund and cancellation rules ensure clarity and transparency for
          all bookings.
        </p>

        <h2>1. Cancellation by User</h2>
        <ul>
          <li>Within 24 hours – 100% refund</li>
          <li>After 24 hours – provider charges apply</li>
          <li>No refund within 48 hours of travel date</li>
        </ul>

        <h2>2. Cancellation by Us</h2>
        <p>Full refund or alternate option will be provided.</p>

        <h2>3. Timeline</h2>
        <p>Refunds are processed within 7–14 working days.</p>

        <h2>4. Non-refundable Items</h2>
        <p>Some flights and activities may be marked non-refundable.</p>
      </div>
    </div>
  );
}
