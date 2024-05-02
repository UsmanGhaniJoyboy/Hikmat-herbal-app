import React, { useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import "../StyleSheets/filter.css";

function Filter_disease() {
  const [disease, setDisease] = useState("");
  const [hakeem, setHakeem] = useState("");
  const [price, setPrice] = useState(2500); // Default price value
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default gender value

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted:", {
      disease,
      hakeem,
      price,
      age,
      gender,
    });
  };
  return (
    <>
      <CustomeNav />
      <div className="filter_profile">
          <h2>Filter Disease</h2>
          </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="disease" className="form-label">
              Disease/Symptoms:
            </label>
            <select
              id="disease"
              name="disease"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="form-input"
            >
              <option value="Hairfall">Hairfall</option>
              <option value="Stomach Pain">Stomach Pain</option>
              <option value="Constipation">Constipation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hakeem" className="form-label">
              Hakeem:
            </label>
            <select
              id="hakeem"
              name="hakeem"
              value={hakeem}
              onChange={(e) => setHakeem(e.target.value)}
              className="form-input"
            >
              <option value="hakeem1">Hakeem 1</option>
              <option value="hakeem2">Hakeem 2</option>
              <option value="hakeem3">Hakeem 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price Range: ${price}
            </label>
            <input
              type="range"
              id="price"
              name="price"
              min="100"
              max="5000"
              value={price}
              onChange={handlePriceChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Age"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="form-input"
              />
              <label htmlFor="male" className="form-label">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="form-input"
              />
              <label htmlFor="female" className="form-label">
                Female
              </label>
            </div>
          </div>

          <button type="submit" className="form-button">
            Search
          </button>
        </form>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Filter_disease;
