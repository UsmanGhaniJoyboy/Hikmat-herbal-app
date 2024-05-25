import React, { useEffect, useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import "../StyleSheets/Add_ingredient.css"; // Make sure to import the CSS file
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Modelbtn from "../inc/Model";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Add_ingredient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Nuskha_Id } = location.state;

  const [remedy_id, setRemedy_id] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState("");
  //handle model in these 3 states
  const [show, setShow] = useState(false);

  useEffect(()=>{
    // setRemedy_id(Nuskha_Id);
    console.log("remedy id is coming ",Nuskha_Id);
  })

  const handleClose = () => setShow(false);




  const handleShow = async () => {
    const formData = new FormData();
    formData.append("name", ingredient);
    formData.append("publicity", "public");

    try {
      const responseAddIng = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/AddIngrdeients",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIngredientId(responseAddIng.data);

      if (responseAddIng.data && responseAddIng.data != "NO DATA") {
        console.log("Ingredient added : ", ingredientId);
      }
      const formData2 = new FormData();
      formData2.append("quantity", quantity);
      formData2.append("unit", unit);
      formData2.append("r_id", Nuskha_Id);
      formData2.append("i_id", ingredientId);

      const responseAddIngredient = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/AddIngrdeintsquantity",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      if (error.responseAddIng) {
        console.error("Response data:", error.responseAddIng.data);
        console.error("Response status:", error.responseAddIng.status);
        console.error("Response headers:", error.responseAddIng.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
      }
    }
    // All fields are filled, navigate to next step
    // navigate("/HakeemProfile/Add_Remedies/Add_ingredient/Steps");
    setShow(true);
  };
  
  const handleAddIngredient = () => {
    setIngredient("");
    setQuantity("");
    setUnit("");
    setShow(false); // Close the modal after adding an ingredient
  };

  const handleSaveChanges = () => {
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient/Steps");
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };
  return (
    <div>
      <CustomeNav />
      <Custome_heading title="Add Ingredient" />
      <div className="add-Ing-container text-center">
        {" "}
        {/* Apply the styling class */}
        <form>
          <div className="AddIngredient_form-group">
            <input
              type="text"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={handleIngredientChange}
              className="form-control" // Apply the styling class
            />
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
            {/* <button
              type="button"
              onClick={handleAddQuantity}
              // Apply the styling class and add margin-top
            >
              Add Ingredient
            </button> */}
          </div>
          {/* <button
            type="button"
            onClick={handleNextStep}
            // Apply the styling class
          >
            Move to next step
          </button> */}
        </form>
        <button variant="primary" onClick={handleShow}>
          Next Step
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>You can add more ingredients</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddIngredient}>
              Add Ingredients
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Add_ingredient;
