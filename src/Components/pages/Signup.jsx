import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/Signup.css";
import logo_again from "../images/logo again.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
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
      console.log(error);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/Hakeemhikmat/api/Users/Signup",
        {
          name,
          email,
          password,
          rol,
        }
      );

      if (response.data === "data entered") {
        // Redirect or perform any action upon successful signup
        console.log({ name, email, password, rol });
        console.log(response.data);
        alert("Registration Completed")
        navigate("/");
      } else {
        setError("Email is already in use");
        console.log(error);
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
            onChange={(e) => setname(e.target.value)}
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
              value="patient"
              checked={rol === "Patient"}
              onChange={() => setRole("Patient")}
            />
            <span className="label_radio"> Patient</span>
          </label>
          <label>
            <input
              type="radio"
              value="hakeem"
              checked={rol === "Hakeem"}
              onChange={() => setRole("Hakeem")}
            />
            <span>Hakeem</span>
          </label>
        </div>
        {emailError && <p className="error">{emailError}</p>}
        <button onClick={handleSubmit} type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
