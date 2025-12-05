import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">TravelX</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/places">Places</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            {user?.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            {!user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>}
            {user && <li><button onClick={logout} className="logout-btn">Logout</button></li>}
          </ul>
        </nav>
      </div>
    </header>
  );
}
