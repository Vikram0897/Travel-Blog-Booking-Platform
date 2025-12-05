import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) return <h2>No booking data found.</h2>;

  return (
    <div className="confirmation-wrapper">
      <div className="booking-card">
        <h3>Booking Confirmation ✅</h3>

        {/* Hotel & Package */}
        <p>
          <span role="img" aria-label="hotel">🏨</span>
          <strong> Hotel:</strong> {booking.hotelName}
        </p>

        <p>
          <span role="img" aria-label="package">📦</span>
          <strong> Package:</strong> {booking.packageName}
        </p>

        {/* Traveler Info */}
        <p>
          <span role="img" aria-label="user">👤</span>
          <strong> Traveler:</strong> {booking.travelerName}
        </p>

        <p>
          <span role="img" aria-label="users">🧑‍🤝‍🧑</span>
          <strong> No. of Travelers:</strong> {booking.travelers}
        </p>

        {/* Room */}
        <p>
          <span role="img" aria-label="bed">🛏️</span>
          <strong> Room Type:</strong> {booking.selectedRoom}
        </p>

        {/* Dates */}
        <p>
          <span role="img" aria-label="calendar">📅</span>
          <strong> Dates:</strong> {booking.startDate} - {booking.endDate}
        </p>

        {/* Food */}
        {booking.includeFood && (
          <p>
            <span role="img" aria-label="food">🍽️</span>
            Food Included
          </p>
        )}

        {/* Coupon */}
        {booking.coupon && (
          <p>
            <span role="img" aria-label="coupon">🏷️</span>
            Coupon Applied: {booking.coupon} (₹{booking.discountAmount} off)
          </p>
        )}

        {/* Payment */}
        <p>
          <span role="img" aria-label="payment">💳</span>
          <strong> Payment Method:</strong> {booking.paymentInfo.method}
        </p>

        <p className={booking.paymentInfo.amountPaid > 0 ? "payment-success" : "payment-pending"}>
          {booking.paymentInfo.amountPaid > 0
            ? "Payment Successful ✅"
            : "Payment Pending ❌"}
        </p>

        {/* Total & Room No */}
        <p><strong>Total Paid:</strong> ₹{booking.totalPrice}</p>
        <p><strong>Room Number:</strong> {booking.roomNumber}</p>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
