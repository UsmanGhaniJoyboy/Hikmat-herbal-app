import CustomeNav from "../inc/CustomeNav";
import React, { useState } from "react";
import "../StyleSheets/Add_Rem.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Custome_heading from "../inc/Custome_heading";

function Add_Remedies() {
  const navigate = useNavigate();

  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [remedyName, setRemedyName] = useState("");
  const [Remedy_privacy, setRemedy_privacy] = useState({
    Public: false,
    Private: false,
  });

  const handleDiseaseChange = (selectedOptions) => {
    setSelectedDiseases(selectedOptions.map((option) => option.value));
  };

  const gotoIngredient=()=>{
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      selectedDiseases,
      remedyName,
      Remedy_privacy,
    });
  };

  // Define options here
  const options = [
    { value: "asthma", label: "Asthma" },
    { value: "diabetes", label: "Diabetes" },
    { value: "hypertension", label: "Hypertension" },
  ];

  return (
    <>
      <CustomeNav />
      <Custome_heading
      title="Add Remedies"
      />
      <div className="add-remedies-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="disease">Diseases:</label>
            <Select
              id="disease"
              isMulti
              value={options.filter((option) =>
                selectedDiseases.includes(option.value)
              )}
              onChange={handleDiseaseChange}
              options={options}
              required
            />
            <div>Disease Selected: {selectedDiseases.join(", ")}</div>
          </div>

          <div className="form-group">
            <label htmlFor="remedyName">Name of Remedy:</label>
            <input
              type="text"
              id="remedyName"
              value={remedyName}
              onChange={(e) => setRemedyName(e.target.value)}
              placeholder="Enter Name of Remedy"
              required
            />
          </div>

          <div className="form-group">
            <label>Remedy Should be:</label>
            <div className="radio-group">
              <label htmlFor="Public">
                <input
                  type="radio"
                  id="Public"
                  name="Remedy_privacy"
                  checked={Remedy_privacy.Public}
                  onChange={() =>
                    setRemedy_privacy({ Public: true, Private: false })
                  }
                />
                Public
              </label>
              <label htmlFor="Private">
                <input
                  type="radio"
                  id="Private"
                  name="Remedy_privacy"
                  checked={Remedy_privacy.Private}
                  onChange={() =>
                    setRemedy_privacy({ Public: false, Private: true })
                  }
                />
                Private
              </label>
            </div>
          </div>
          <button onClick={gotoIngredient} type="submit">Move to next step</button>
        </form>
      </div>
    </>
  );
}
export default Add_Remedies;
