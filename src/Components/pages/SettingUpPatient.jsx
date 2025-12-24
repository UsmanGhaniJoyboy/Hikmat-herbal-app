import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo_again from "../images/logo again.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Select from "react-select";

const SettingUpPatient = ({ handleUserRole }) => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);

  useEffect(() => {
    // Fetch diseases from the backend API
    axios
      .get("http://localhost/Hakeemhikmat/api/Addnushka/showAllDisease")
      .then((response) => {
        if (response.data && response.data !== "NO DATA") {
          setDiseases(
            response.data.map((disease) => ({
              value: disease.id,
              label: disease.name,
            }))
          );
        } else {
          console.log("No diseases found");
        }
      })
      .catch((error) => {
        console.error("Error fetching diseases:", error);
      });
  }, []);

  const handleHomebtn = () => {
    const userId = handleUserRole.id;
    const diseaseIds = selectedDisease.map((disease) => disease.value);



    // Validate input
    if (!userId || diseaseIds.length === 0) {
      alert("Please select at least one disease");
      return;
    }

    // Prepare request payload
    const payload = JSON.stringify(diseaseIds);

    // Make API request to save diseases
    axios
      .post(
        `http://localhost/Hakeemhikmat/api/Addnushka/SaveDiseases?userId=${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Diseases saved successfully");
        navigate("/Home", { state: { diseaseIds } });
      })
      .catch((error) => {
        console.error("Error saving diseases:", error);
        alert("Error saving diseases");
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
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          Setting up Profile
        </h3>
        <form>
          <Select
            options={diseases}
            value={selectedDisease}
            isMulti
            onChange={(selectedOptions) => {
              setSelectedDisease(selectedOptions);
            }}
          />
          <Button onClick={handleHomebtn}>Go to Home</Button>
        </form>
      </div>
    </div>
  );
};

export default SettingUpPatient;
