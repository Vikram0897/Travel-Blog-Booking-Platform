import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect already logged-in user automatically
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ Admin login
    if (name === "admin" && password === "admin123") {
      const adminUser = { name: "admin", role: "admin" };
      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin", { replace: true }); // Redirect to admin dashboard
      return;
    }

    // ✅ Normal user login
    const user = users.find((u) => u.name === name && u.password === password);

    if (!user) {
      alert("Invalid name or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ ...user, role: "user" }));
    navigate("/home", { replace: true }); // Redirect to user homepage
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
          Don&apos;t have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}
