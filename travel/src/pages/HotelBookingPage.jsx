import React, { useState } from "react";
import { useParams } from "react-router-dom";

const HotelBookingPage = () => {
  const { hotelId } = useParams();

  // Sample room numbers
  const roomNumbers = Array.from({ length: 20 }, (_, i) => i + 101);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [days, setDays] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleBooking = () => {
    if (!selectedRoom) {
      alert("Please select a room!");
      return;
    }

    setSuccess(true);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Hotel Booking</h1>
      <h2>Hotel ID: {hotelId}</h2>

      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "18px" }}>Select Room Number:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          <option value="">-- Choose a room --</option>
          {roomNumbers.map((room) => (
            <option key={room} value={room}>
              Room {room}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "18px" }}>Number of Days:</label>
        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "10px",
            fontSize: "16px",
            width: "120px",
          }}
        />
      </div>

      <button
        onClick={handleBooking}
        style={{
          marginTop: "25px",
          padding: "12px 25px",
          background: "green",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Confirm Booking
      </button>

      {success && (
        <p style={{ marginTop: "20px", fontSize: "20px", color: "green" }}>
          🎉 Booking Successful! Room {selectedRoom} booked for {days} days.
        </p>
      )}
    </div>
  );
};

export default HotelBookingPage;
