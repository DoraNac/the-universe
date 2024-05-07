import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { registerUser } from "../services/api";
import "../styles/Register-Login.css";

const RegisterLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      await registerUser(name, email, password);
      setSuccessMessage(
        "Registration successful! Now log into your account!"
      );
      setTimeout(() => {
        window.location.href = "/login";
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
        <form onSubmit={handleSubmit}>
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
          Already have an account? <Link to="">Log in!</Link>
        </p>
      </div>

      <div className="loginForm">
        <h2>Log in</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={name}
          onChange={(e) => setPassword(e.target.value)}
        />
    

        <Link to="/homepage">
          {" "}
          <button>Log in</button>
        </Link>
        <p className="auth-switch">
          Don't have an account? <Link to="">registere here!</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterLogin;
