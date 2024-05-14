import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo_again from "../images/logo again.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";

const SettingUpPatient = ({handleSelectedDisease}) => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);

  useEffect(() => {
    // Fetch diseases from the backend API
    axios.get("http://localhost/Hakeemhikmat/api/Addnushka/showAllDisease")
      .then((response) => {
        // Check if the response contains data
        if (response.data && response.data !== "NO DATA") {
          console.log("Diseases:", response.data);
          // setDiseases(response.data);
          setDiseases(response.data.map(disease => ({ value: disease.id, label: disease.name })));
          // handleDisease(setDiseases);
          console.log(diseases);
        } else {
          console.log("No diseases found");
        }
      })
      .catch((error) => {
        console.error("Error fetching diseases:", error);
      });
  }, []);

  const handleHomebtn = () => {
    console.log("Selected diseases:", selectedDisease); 
    handleSelectedDisease(selectedDisease);
    // navigate("/Home", { state: { response_Patient: "PatientHere" }})
    navigate("/Home");
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
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          Create your Profile
        </h3>
        <form>
        <Select
            options={diseases}
            value={selectedDisease}
           isMulti
            onChange={(selectedOptions) =>{setSelectedDisease(selectedOptions)
            } }
          />
          <Button onClick={handleHomebtn}>Go to Home</Button>
        </form>
      </div>
    </div>
  );
};

export default SettingUpPatient;
