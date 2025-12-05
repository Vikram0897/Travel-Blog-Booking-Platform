import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  // Delete a booking
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updated = bookings.filter((b) => b.id !== id);
      localStorage.setItem("bookings", JSON.stringify(updated));
      setBookings(updated);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h2>{booking.packageName}</h2>
              <p>
                <strong>Traveler:</strong> {booking.travelerName}
              </p>
              <p>
                <strong>Room:</strong> {booking.roomType} (Room No: {booking.roomNumber})
              </p>
              <p>
                <strong>Travelers:</strong> {booking.travelers}
              </p>
              <p>
                <strong>Days:</strong> {booking.days}
              </p>
              <p>
                <strong>Food:</strong> {booking.includeFood ? "With Food" : "Without Food"}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{booking.totalPrice}
              </p>
              <button className="delete-btn" onClick={() => handleDelete(booking.id)}>
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
