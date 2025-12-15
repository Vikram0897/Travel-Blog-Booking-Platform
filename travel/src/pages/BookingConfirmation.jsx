import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking =
    location.state?.booking ||
    JSON.parse(localStorage.getItem("lastBooking"));

  if (!booking) return <h2>No booking data found.</h2>;

  return (
    <div className="confirmation-wrapper">
      <div className="booking-card">
        <h3>Booking Confirmation ✅</h3>

        <p>🏨 <strong>Hotel:</strong> {booking.hotelName}</p>
        <p>📦 <strong>Package:</strong> {booking.packageName}</p>
        <p>👤 <strong>Traveler:</strong> {booking.travelerName}</p>
        <p>🧑‍🤝‍🧑 <strong>No. of Travelers:</strong> {booking.travelers}</p>
        <p>🛏️ <strong>Room Type:</strong> {booking.selectedRoom}</p>
        <p>📅 <strong>Dates:</strong> {booking.startDate} - {booking.endDate}</p>

        {booking.includeFood && <p>🍽️ Food Included</p>}

        <p>💳 <strong>Payment Method:</strong> {booking.paymentInfo.method}</p>
        <p className="payment-success">Payment Successful ✅</p>

        <p><strong>Total Paid:</strong> ₹{booking.totalPrice}</p>
        <p><strong>Room Number:</strong> {booking.roomNumber}</p>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
