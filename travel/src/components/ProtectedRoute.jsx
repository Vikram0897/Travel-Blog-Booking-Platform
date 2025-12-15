import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (role) {
    if (role === "admin" && user.role !== "admin") {
      // If page is admin-only but user is not admin → redirect to home
      return <Navigate to="/home" replace />;
    }

    if (role === "user" && user.role !== "user") {
      // If page is user-only but user is admin → redirect to admin dashboard
      return <Navigate to="/admin" replace />;
    }
  }

  // Authorized
  return children;
}
