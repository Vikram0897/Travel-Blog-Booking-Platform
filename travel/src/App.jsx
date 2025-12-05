import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import PackagesPage from "./pages/PackagesPage";
import BookingPage from "./pages/BookingPage";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import TermsPage from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Protected Routes for Users */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute role="user">
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute role="user">
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />

        {/* Protected Route for Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <p style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>
              Page Not Found
            </p>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
