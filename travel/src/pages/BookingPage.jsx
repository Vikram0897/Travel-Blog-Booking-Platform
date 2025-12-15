import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { packages } from "../data/packages";
import "./BookingPage.css";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pkgId = parseInt(params.get("pkgId"), 10);

  const selectedPkg = packages.find((p) => p.id === pkgId);

  const [travelerName, setTravelerName] = useState("");
  const [travelers, setTravelers] = useState(""); 
  const [days, setDays] = useState(""); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [includeFood, setIncludeFood] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [generatedCoupon, setGeneratedCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  // Payment info
  const [paymentMethod, setPaymentMethod] = useState(""); // UPI, Card, Netbanking
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");

  if (!selectedPkg) return <h2>Package not found</h2>;

  const pricePerPersonPerDay = selectedPkg.pricePerPersonPerDay || 0;
  const foodPerPersonPerDay = selectedPkg.foodPerPersonPerDay || 0;
  const roomTypes = selectedPkg.roomTypes || [];

  // Generate coupon once
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCoupon(code);
  }, []);

  // Calculate end date
  useEffect(() => {
    const numDays = Number(days);
    if (!startDate || isNaN(numDays) || numDays <= 0) {
      setEndDate("");
      return;
    }
    const sd = new Date(startDate);
    const ed = new Date(sd);
    ed.setDate(sd.getDate() + numDays);
    setEndDate(ed.toISOString().split("T")[0]);
  }, [startDate, days]);

  // Calculate total price
  useEffect(() => {
    const numTravelers = Number(travelers);
    const numDays = Number(days);
    if (
      !selectedRoom ||
      includeFood === null ||
      isNaN(numTravelers) ||
      numTravelers <= 0 ||
      isNaN(numDays) ||
      numDays <= 0
    ) {
      setTotalPrice(0);
      return;
    }
    const roomObj = roomTypes.find((r) => r.type === selectedRoom) || { pricePerNight: 0 };
    const roomCost = roomObj.pricePerNight * numDays;
    const packageCost = numTravelers * numDays * pricePerPersonPerDay;
    const foodCost = includeFood ? numTravelers * numDays * foodPerPersonPerDay : 0;
    const total = packageCost + roomCost + foodCost - discountAmount;
    setTotalPrice(Math.max(0, total));
  }, [
    selectedRoom,
    travelers,
    days,
    includeFood,
    discountAmount,
    pricePerPersonPerDay,
    foodPerPersonPerDay,
    roomTypes,
  ]);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === generatedCoupon) {
      const discount = Math.floor(Math.random() * 700) + 800;
      setDiscountAmount(discount);
      setError("");
    } else {
      setDiscountAmount(0);
      setError("Invalid Coupon Code");
    }
  };

  const handleBooking = () => {
    const numTravelers = Number(travelers);
    const numDays = Number(days);

    if (!travelerName || !numTravelers || !numDays || !startDate || !selectedRoom || includeFood === null) {
      setError("Please fill all booking fields");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    // Validate payment details
    if (paymentMethod === "UPI" && !upiId) {
      setError("Please enter your UPI ID");
      return;
    }
    if (paymentMethod === "Card" && (!cardNumber || !cvv)) {
      setError("Please enter Card Number and CVV");
      return;
    }
    if (paymentMethod === "Netbanking" && !bank) {
      setError("Please select a bank for netbanking");
      return;
    }

    const roomNo = Math.floor(Math.random() * 900) + 100;

  const booking = {
  id: Date.now(),
  hotelName: selectedPkg.hotelName || selectedPkg.title,
  packageName: selectedPkg.title,
  travelerName,
  travelers: numTravelers,
  days: numDays,
  startDate,
  endDate,
  selectedRoom,
  includeFood,
  coupon: couponCode,
  discountAmount,
  totalPrice,
  roomNumber: roomNo,
  createdAt: new Date().toISOString(),
  paymentInfo: {
    method: paymentMethod,
    amountPaid: totalPrice,
    paymentDate: new Date().toISOString(),
  },
};



    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    prev.push(booking);
    localStorage.setItem("bookings", JSON.stringify(prev));

    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div className="booking-wrapper">
      {/* Package Banner */}
      <div className="banner">
        <img src={selectedPkg.image} className="selected-place" alt={selectedPkg.title} />
        <div className="banner-overlay">
          <h1>{selectedPkg.title}</h1>
          <p>{selectedPkg.hotelName} • {selectedPkg.hotelRating}⭐</p>
        </div>
      </div>

      <div className="booking-card">
        {/* Booking Fields */}
        <div className="form-section">
          <h4>Traveler Name</h4>
          <input type="text" value={travelerName} onChange={(e) => setTravelerName(e.target.value)} placeholder="Enter full name" />
        </div>
        <div className="form-section">
          <h4>No. of Travelers</h4>
          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value ? parseInt(e.target.value) : "")}
          />
        </div>
        <div className="form-section">
          <h4>No. of Days</h4>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value ? parseInt(e.target.value) : "")}
          />
        </div>
        <div className="form-section">
          <h4>Start Date</h4>
          <input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)} />
          {endDate && <p className="muted">End Date: {endDate}</p>}
        </div>

        {/* Room Type */}
        <div className="sub-section">
          <h4>Select Room Type</h4>
          <div className="room-options">
            {roomTypes.map((r) => (
              <label key={r.type} className={`radio-card ${selectedRoom === r.type ? "active" : ""}`}>
                <input type="radio" name="room" value={r.type} checked={selectedRoom === r.type} onChange={() => setSelectedRoom(r.type)} />
                <div className="radio-content">{r.type} • ₹{r.pricePerNight}/night</div>
              </label>
            ))}
          </div>
        </div>

        {/* Food Option */}
        <div className="sub-section">
          <h4>Food Option</h4>
          <label className={`radio-card ${includeFood === false ? "active" : ""}`}>
            <input type="radio" name="food" onChange={() => setIncludeFood(false)} />Without Food
          </label>
          <label className={`radio-card ${includeFood === true ? "active" : ""}`}>
            <input type="radio" name="food" onChange={() => setIncludeFood(true)} />With Food • ₹{foodPerPersonPerDay}/person/day
          </label>
        </div>

        {/* Coupon */}
        <div className="sub-section">
          <h4>Apply Coupon</h4>
          <p>Use this coupon: <strong>{generatedCoupon}</strong></p>
          <input value={couponCode} placeholder="Enter coupon" onChange={(e) => setCouponCode(e.target.value)} />
          <button className="apply-btn" onClick={handleApplyCoupon}>Apply</button>
          {discountAmount > 0 && <p className="discount-msg">Discount: ₹{discountAmount}</p>}
        </div>

        {/* Payment Method */}
        <div className="sub-section">
          <h4>Select Payment Method</h4>
          <label>
            <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
            UPI
          </label>
          <label>
            <input type="radio" name="payment" value="Card" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} />
            Card
          </label>
          <label>
            <input type="radio" name="payment" value="Netbanking" checked={paymentMethod === "Netbanking"} onChange={() => setPaymentMethod("Netbanking")} />
            Netbanking
          </label>

          {paymentMethod === "UPI" && (
            <div>
              <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
          )}
          {paymentMethod === "Card" && (
            <div>
              <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          )}
          {paymentMethod === "Netbanking" && (
            <div>
              <input type="text" placeholder="Bank Name" value={bank} onChange={(e) => setBank(e.target.value)} />
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="terms-checkbox">
          <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
          <label>I accept the Terms & Conditions</label>
        </div>

        {/* Summary */}
        <div className="checkout-row">
          <h3>Total: ₹{totalPrice}</h3>
          <button className="confirm-btn" onClick={handleBooking}>Pay Now</button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
