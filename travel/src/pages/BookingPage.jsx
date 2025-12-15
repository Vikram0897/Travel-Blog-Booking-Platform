import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { packages } from "../data/packages";
import "./BookingPage.css";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const pkgId = Number(params.get("pkgId"));

  const selectedPkg = packages.find((p) => p.id === pkgId);
  if (!selectedPkg) return <h2>Package not found</h2>;

  /* -------------------- STATE -------------------- */
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

  /* Payment */
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");

  const pricePerPersonPerDay = selectedPkg.pricePerPersonPerDay || 0;
  const foodPerPersonPerDay = selectedPkg.foodPerPersonPerDay || 0;
  const roomTypes = selectedPkg.roomTypes || [];

  /* -------------------- COUPON -------------------- */
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCoupon(code);
  }, []);

  /* -------------------- END DATE -------------------- */
  useEffect(() => {
    const d = Number(days);
    if (!startDate || d <= 0) {
      setEndDate("");
      return;
    }
    const sd = new Date(startDate);
    sd.setDate(sd.getDate() + d);
    setEndDate(sd.toISOString().split("T")[0]);
  }, [startDate, days]);

  /* -------------------- TOTAL PRICE -------------------- */
  useEffect(() => {
    const t = Number(travelers);
    const d = Number(days);
    if (!selectedRoom || includeFood === null || t <= 0 || d <= 0) {
      setTotalPrice(0);
      return;
    }

    const room = roomTypes.find((r) => r.type === selectedRoom);
    const roomCost = (room?.pricePerNight || 0) * d;
    const packageCost = t * d * pricePerPersonPerDay;
    const foodCost = includeFood ? t * d * foodPerPersonPerDay : 0;

    setTotalPrice(Math.max(0, packageCost + roomCost + foodCost - discountAmount));
  }, [travelers, days, selectedRoom, includeFood, discountAmount]);

  /* -------------------- VALIDATION -------------------- */
  const isFormValid =
    travelerName.trim() &&
    Number(travelers) > 0 &&
    Number(days) > 0 &&
    startDate &&
    selectedRoom &&
    includeFood !== null &&
    acceptTerms &&
    paymentMethod &&
    (
      (paymentMethod === "UPI" && upiId) ||
      (paymentMethod === "Card" && cardNumber && cvv) ||
      (paymentMethod === "Netbanking" && bank)
    );

  /* -------------------- COUPON APPLY -------------------- */
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === generatedCoupon) {
      setDiscountAmount(Math.floor(Math.random() * 700) + 800);
      setError("");
    } else {
      setDiscountAmount(0);
      setError("Invalid Coupon Code");
    }
  };

  /* -------------------- BOOKING -------------------- */
  const handleBooking = () => {
    if (!isFormValid) return;

    const booking = {
      id: Date.now(),
      hotelName: selectedPkg.hotelName || selectedPkg.title, // ✅ FIX
      packageName: selectedPkg.title,
      travelerName,
      travelers: Number(travelers),
      days: Number(days),
      startDate,
      endDate,
      selectedRoom,
      includeFood,
      discountAmount,
      totalPrice,
      roomNumber: Math.floor(Math.random() * 900) + 100,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    prev.push(booking);
    localStorage.setItem("bookings", JSON.stringify(prev));

    navigate("/confirmation", { state: { booking } });
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="booking-wrapper">
      <div className="banner">
        <img src={selectedPkg.image} alt={selectedPkg.title} />
        <div className="banner-overlay">
          <h1>{selectedPkg.title}</h1>
          <p>{selectedPkg.hotelName} • {selectedPkg.hotelRating}⭐</p>
        </div>
      </div>

      <div className="booking-card">
        <input placeholder="Traveler Name" value={travelerName} onChange={(e) => setTravelerName(e.target.value)} />
        <input type="number" min="1" placeholder="Travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
        <input type="number" min="1" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} />
        <input type="date" min={new Date().toISOString().split("T")[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        {endDate && <p>End Date: {endDate}</p>}

        <h4>Room Type</h4>
        {roomTypes.map((r) => (
          <label key={r.type}>
            <input type="radio" checked={selectedRoom === r.type} onChange={() => setSelectedRoom(r.type)} />
            {r.type} ₹{r.pricePerNight}/night
          </label>
        ))}

        <h4>Food</h4>
        <label><input type="radio" onChange={() => setIncludeFood(false)} />Without Food</label>
        <label><input type="radio" onChange={() => setIncludeFood(true)} />With Food</label>

        <h4>Coupon</h4>
        <p>Use: <strong>{generatedCoupon}</strong></p>
        <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        <button onClick={handleApplyCoupon}>Apply</button>

        <h4>Payment</h4>
        <label><input type="radio" onChange={() => setPaymentMethod("UPI")} />UPI</label>
        <label><input type="radio" onChange={() => setPaymentMethod("Card")} />Card</label>
        <label><input type="radio" onChange={() => setPaymentMethod("Netbanking")} />Netbanking</label>

        {paymentMethod === "UPI" && <input placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />}
        {paymentMethod === "Card" && (
          <>
            <input placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </>
        )}
        {paymentMethod === "Netbanking" && <input placeholder="Bank Name" value={bank} onChange={(e) => setBank(e.target.value)} />}

        <label>
          <input type="checkbox" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
          Accept Terms
        </label>

        <h3>Total ₹{totalPrice}</h3>

        <button className="confirm-btn" disabled={!isFormValid} onClick={handleBooking}>
          Pay Now
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}
