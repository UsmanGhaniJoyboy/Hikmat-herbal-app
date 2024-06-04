import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/Signup.css";
import logo_again from "../images/logo again.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRole] = useState(""); // Default rol is patient
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        rol,
      };
      console.log("Sending user data:", userData); // Log the user data being sent

      const response = await axios.post(
        "http://localhost/Hakeemhikmat/api/Users/Signup",
        userData
      );

      console.log("API response:", response.data);

      if (response.data === "data entered") {
        // Redirect or perform any action upon successful signup
        alert("Registration Completed");
        navigate("/");
      } else if (response.data === "email is in use") {
        setError("Email is already in use");
      } else {
        setError("An error occurred while signing up");
      }
    } catch (error) {
      setError("An error occurred while signing up");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="title_container">
        <img
          src={logo_again}
          alt="oops"
          style={{ width: "8%", height: "auto", margin: "0px" }}
        />
        <h1 className="title">Hikmat App</h1>
      </div>
      <hr
        style={{
          margin: "auto",
          width: "80%",
          color: "black",
          height: "2px",
          border: "1px solid black",
        }}
      />
      <h2
        style={{ textAlign: "center", marginTop: "10px", fontSize: "1.6rem" }}
      >
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container radio">
          <label style={{ fontSize: "1.3rem" }}>Role:</label>
          <label>
            <input
              type="radio"
              value="Patient"
              checked={rol === "Patient"}
              onChange={() => setRole("Patient")}
            />
            <span className="label_radio"> Patient</span>
          </label>
          <label>
            <input
              type="radio"
              value="Hakeem"
              checked={rol === "Hakeem"}
              onChange={() => setRole("Hakeem")}
            />
            <span>Hakeem</span>
          </label>
        </div>
        {emailError && <p className="error">{emailError}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
