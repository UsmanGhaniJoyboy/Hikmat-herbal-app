import React, { useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import "../StyleSheets/Add_ingredient.css"; // Make sure to import the CSS file
import { useNavigate } from "react-router-dom";

const Add_ingredient = () => {
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleAddIngredient = () => {
    // Handle adding ingredient here
    console.log("Added Ingredient:", ingredient);
    console.log("Quantity:", quantity);
    console.log("Unit:", unit);
    // Clear the input fields after adding
    setIngredient("");
    setQuantity("");
    setUnit("");
  };

  const handleNext = () => {
    // Check if any field is empty
    if (!ingredient || !quantity || !unit) {
      // If any field is empty, don't navigate to next step
      // console.log("One or more fields are empty. Cannot navigate to next step.");
      alert("one of field is empty")
    } else {
      // All fields are filled, navigate to next step
      navigate("/HakeemProfile/Add_Remedies/Add_ingredient/Steps");
    }
  };

  const handleAddQuantity = () => {
    // Handle adding quantity here
    console.log("Added Quantity:", quantity);
    // Clear the quantity field after adding
    setQuantity("");
  };

  return (
    <div>
      <CustomeNav />
      <Custome_heading title="Add Ingredient" />
      <div className="add-Ing-container text-center"> {/* Apply the styling class */}
        <form>
          <div className="AddIngredient_form-group">
            <input
              type="text"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={handleIngredientChange}
              className="form-control" // Apply the styling class
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              // Apply the styling class and add margin-right
            >
              Add Ingredient
            </button>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Add quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control" // Apply the styling class
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Add unit"
              value={unit}
              onChange={handleUnitChange}
              className="form-control" // Apply the styling class
            />
            <button
              type="button"
              onClick={handleAddQuantity}
              // Apply the styling class and add margin-top
            >
              Add Quantity
            </button>
          </div>
          <button
            type="button"
            onClick={handleNext}
            // Apply the styling class
          >
            Move to next step
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_ingredient;
