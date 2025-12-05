import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"
export default function Payment() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentBooking"));
    if (!current) {
      navigate("/booking");
    } else {
      setBooking(current);
    }
  }, [navigate]);

  const handlePayNow = () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      setError("Please enter your UPI ID");
      return;
    }

    if (paymentMethod === "Card") {
      if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        setError("Please enter card number, expiry, and CVV");
        return;
      }
      if (cardNumber.length < 12 || cardNumber.length > 19) {
        setError("Invalid card number");
        return;
      }
      if (cvv.length !== 3) {
        setError("CVV must be 3 digits");
        return;
      }
    }

    if (paymentMethod === "Netbanking" && !bank.trim()) {
      setError("Please select your bank");
      return;
    }

    setError("");

    // Save payment info
    const paymentInfo = {
      method: paymentMethod,
      upiId: paymentMethod === "UPI" ? upiId : null,
      cardNumber: paymentMethod === "Card" ? cardNumber : null,
      bank: paymentMethod === "Netbanking" ? bank : null,
      amountPaid: booking.totalPrice,
      paymentDate: new Date().toISOString(),
    };

    // Store final booking with payment info
    const finalBooking = { ...booking, paymentInfo };
    const prevBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    prevBookings.push(finalBooking);
    localStorage.setItem("bookings", JSON.stringify(prevBookings));
    localStorage.removeItem("currentBooking"); // clear temp booking

    navigate("/confirmation", { state: { booking: finalBooking } });
  };

  if (!booking) return null;

  return (
    <div className="payment-wrapper">
      <h2>Payment for {booking.packageName}</h2>
      <p>Total Amount: ₹{booking.totalPrice}</p>

      <div className="payment-methods">
        <h4>Select Payment Method:</h4>
        <label>
          <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
          UPI (GPay, PhonePe, Paytm)
        </label>
        <label>
          <input type="radio" value="Card" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} />
          Credit/Debit Card
        </label>
        <label>
          <input type="radio" value="Netbanking" checked={paymentMethod === "Netbanking"} onChange={() => setPaymentMethod("Netbanking")} />
          Netbanking
        </label>
      </div>

      {/* Dynamic Input Fields */}
      {paymentMethod === "UPI" && (
        <div className="payment-input">
          <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        </div>
      )}

      {paymentMethod === "Card" && (
        <div className="payment-input">
          <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <input type="text" placeholder="Expiry MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </div>
      )}

      {paymentMethod === "Netbanking" && (
        <div className="payment-input">
          <select value={bank} onChange={(e) => setBank(e.target.value)}>
            <option value="">Select Bank</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="ICICI">ICICI Bank</option>
            <option value="SBI">State Bank of India</option>
            <option value="Axis">Axis Bank</option>
          </select>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      <button className="paynow-btn" onClick={handlePayNow}>
        Pay Now
      </button>
    </div>
  );
}
