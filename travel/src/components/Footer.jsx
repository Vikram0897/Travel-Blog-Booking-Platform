import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-glass">
      <p className="footer-bottom">
        © {new Date().getFullYear()} TravelSite | All Rights Reserved
      </p>
    </footer>
  );
}
