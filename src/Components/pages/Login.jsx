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

  const gotoSignup = () => {
    navigate("/Signup");
  };

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(type === "password" ? eye : eyeOff);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost/Hakeemhikmat/api/Users/Login2?email=${Email}&password=${password}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Full API Response:", data);

        const user = data.user;

        if (!user) {
          alert("User data not found in the API response");
          return;
        }

        const responseEmail = user.email?.trim().toLowerCase();
        const responsePassword = user.password?.trim();

        if (responseEmail === undefined || responsePassword === undefined) {
          alert("Email or password fields not found in the API response");
          return;
        }

        const inputEmail = Email.trim().toLowerCase();
        const inputPassword = password.trim();

        if (
          inputEmail === responseEmail &&
          inputPassword === responsePassword
        ) {
          alert("Successfully logged in");

          if (user.rol === "Patient") {
            if (data.diseases && data.diseases.length > 0) {
              handleUserRole(user);
              navigate("/Home", { state: { diseaseIds: data.diseases.map(disease => disease.id) } });
            } else {
              handleUserRole(user);
              navigate("/SettingUpPatient");
            }
          } else if (user.rol === "Hakeem") {
            sendName(user);
            navigate("/HakeemProfile");
          } else {
            alert("Unknown role");
          }
        } else {
          alert("Invalid email or password in data comparison");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
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
