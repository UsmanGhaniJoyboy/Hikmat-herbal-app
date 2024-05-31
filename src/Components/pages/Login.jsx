import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_again from "../images/logo again.png";
import Button from "react-bootstrap/Button";
import "../StyleSheets/Login.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = ({ handleUserRole, sendName }) => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  useEffect(()=>{
    localStorage.setItem("Email",Email);
  },[Email])

  const gotoSignup = () => {
    navigate("/Signup");
  };

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(type === "password" ? eye : eyeOff);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the login API
    fetch(
      `http://localhost/Hakeemhikmat/api/Users/Login?email=${Email}&password=${password}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        // Check if the login was successful
        if (data.email === Email && data.password === password) {
          // Alert the user and set isLoggedIn statesssss
          // setIsLoggedIn(true);

          // const handleScreen = data.rol;
          alert("Successfully logged in");
          // Redirect to HakeemProfile page
          if (data.rol === "Patient") {
            // navigate("/Home");
            handleUserRole(data.rol);
            navigate("/SettingUpPatient");
          } else {
            sendName(data);
            navigate("/HakeemProfile");
          }
          console.log(data);
        } else {
          throw new Error("Invalid Email or password");
        }
      })
      .catch((error) => {
        // Display error message
        alert(error.message);
      });
  };
  return (
    <div>
      <div className="login-container">
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
        <h3
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "1.6rem",
          }}
        >
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="Email">Email : </label>
            <input
              type="text"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <div className="password-input">
              <input
                type={type}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span className="show-password" onClick={handleToggle}>
                <Icon icon={icon} size={25} />
              </span>
            </div>
          </div>
          <Button onClick={handleSubmit} type="submit">
            Login
          </Button>
        </form>
        <div className="signup">
          <span className="span_signup">Don't have an account?</span>
          <Button
            onClick={gotoSignup}
            type="submit"
            className="singup_btn"
            variant="secondary"
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
