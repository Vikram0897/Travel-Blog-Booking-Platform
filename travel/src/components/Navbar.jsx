import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        TravelSite
      </div>

      {/* Mobile menu toggle */}
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/places" onClick={() => setMenuOpen(false)}>Places</NavLink>
        </li>
        <li>
          <NavLink to="/packages" onClick={() => setMenuOpen(false)}>Packages</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        </li>

        {/* Only admin sees dashboard */}
        {user && user.role === "admin" && (
          <li>
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</NavLink>
          </li>
        )}

        {/* Legal pages */}
        <li>
          <NavLink to="/terms" onClick={() => setMenuOpen(false)}>Terms</NavLink>
        </li>
        <li>
          <NavLink to="/privacy" onClick={() => setMenuOpen(false)}>Privacy</NavLink>
        </li>
        <li>
          <NavLink to="/refund-policy" onClick={() => setMenuOpen(false)}>Refund</NavLink>
        </li>

        {/* Logout button visible for both user and admin */}
        {user && (
          <li>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
