import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser, loginUser } from "../services/apis";
import "../styles/Register-Login.css";

const RegisterLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      setSuccessMessage(data.message);
      setTimeout(() => {
        window.location.href = "/register";
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      setError("Email and password are required.");
      return;
    }

    try {
      const data = await loginUser(loginEmail, loginPassword);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        window.location.href = "/createorexplore";
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registerLoginContainer">
      <div className="registrationForm">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/register">Log in!</Link>
        </p>
      </div>

      <div className="loginForm">
        <h2>Log in</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here!</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterLogin;
