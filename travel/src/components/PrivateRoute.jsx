import React from "react";
import { Navigate } from "react-router-dom";

// role can be "admin" or "user"
export default function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged-in but role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // redirect to home
  }

  return children;
}
