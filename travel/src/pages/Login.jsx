import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Auto redirect if already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Admin login
    if (name === "admin" && password === "admin123") {
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "admin", role: "admin" })
      );
      navigate("/home");
      return;
    }

    // 🔹 Normal user login
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.name === name && u.password === password
    );

    if (!user) {
      alert("Invalid name or password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, role: "user" })
    );

    navigate("/home");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p>
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
