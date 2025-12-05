import React, { useEffect, useState } from "react";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const removeBooking = (indexToRemove) => {
    const updated = bookings.filter((_, index) => index !== indexToRemove);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
      <h2>All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Package</th>
              <th>Persons</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td>{b.username}</td>
                <td>{b.packageName}</td>
                <td>{b.persons}</td>
                <td>₹ {b.totalPrice}</td>
                <td>{b.date}</td>
                <td>
                  <span
                    style={{
                      background: "#d1ffe0",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontWeight: "600"
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => removeBooking(index)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      background: "#ff4d4d",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
