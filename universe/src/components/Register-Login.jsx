import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, getAllUniverses } from "../services/apis";
import "../styles/Register-Login.css";

const RegisterLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setRegisterError("Name, email, and password are required.");
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      setRegisterSuccessMessage(data.message);
      setTimeout(() => {
        window.location.href = "/register";
      }, 80000);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (!loginEmail || !loginPassword) {
      setLoginError("Email and password are required.");
      return;
    }
  
    try {
      const data = await loginUser(loginEmail, loginPassword);
      setLoginSuccessMessage("Login successful!");
  
      // Fetch user's universes
      const universes = await getAllUniverses();
  
      console.log("User's Universes:", universes); 
  
      const userUniverse = universes.find(universe => universe.owner === data.userId);
  
      if (userUniverse) {
        // User has a universe, redirect to their universe/profile
        navigate(`/universe/${userUniverse.id}`, { replace: true });
      } else {
    
        navigate("/createorexplore", { replace: true });
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  


  return (
    <div className="registerLoginContainer">
      <div className="registrationForm">
        <h2>Register</h2>
        {registerError && <p className="error-message">{registerError}</p>}
        {registerSuccessMessage && (
          <p className="success-message">{registerSuccessMessage}</p>
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
      </div>
      <div className="loginForm">
        <h2>Log in</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        {loginSuccessMessage && (
          <p className="success-message">{loginSuccessMessage}</p>
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
      </div>
    </div>
  );
};

export default RegisterLogin;
