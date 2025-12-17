import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Access granted
  return children;
}
