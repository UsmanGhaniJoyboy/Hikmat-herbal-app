import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo_again from "../images/logo again.png";

const SettingUpPatient = () => {
  const navigate = useNavigate();
  const handleHomebtn = ()=>{
    // navigate("/Home", { state: { response_Patient: "PatientHere" }})
    navigate("/Home");
  }
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
            fontSize: "1.3rem",
            fontWeight:'bold'
          }}
        >
          Create your Profile
        </h3>
        <form >
          <div className="input-container">
            <label htmlFor="Email">Email : </label>
            <input
              type="text"
              id="Email"
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
      <Button onClick={handleHomebtn}>Go to Home</Button>
         
        </form>
      </div>
    </div>
  );
};

export default SettingUpPatient;
