import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SettingUpPatient = () => {
  const navigate = useNavigate();
  const handleHomebtn = ()=>{
    // navigate("/Home", { state: { response_Patient: "PatientHere" }})
    navigate("/Home");
  }
  return (
    <div>
      <h2>Setting up profile</h2>
      <Button onClick={handleHomebtn}>Go to Home</Button>
    </div>
  );
};

export default SettingUpPatient;
