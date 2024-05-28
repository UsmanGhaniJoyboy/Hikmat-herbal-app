import React, { useEffect, useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import "../StyleSheets/Add_ingredient.css"; // Make sure to import the CSS file
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Add_ingredient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Nuskha_Id } = location.state || {};

  const [ingredientId, setIngredientId] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("Remedy ID is: ", Nuskha_Id);
  }, [Nuskha_Id]);

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

      if (responseAddIng.data && responseAddIng.data !== "NO DATA") {
        const newIngredientId = responseAddIng.data;
        setIngredientId(newIngredientId);
        console.log("Ingredient added, ID: ", newIngredientId);

        const formData2 = new FormData();
        formData2.append("quantity", quantity);
        formData2.append("unit", unit);
        formData2.append("r_id", Nuskha_Id);
        formData2.append("i_id", newIngredientId);

        console.log("Sending data to AddIngrdeintsquantity API: ", {
          quantity,
          unit,
          r_id: Nuskha_Id,
          i_id: newIngredientId,
        });

        const responseAddIngredient = await axios.post(
          "http://localhost/Hakeemhikmat/api/Addnushka/AddIngrdeintsquantity",
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Quantity added: ", responseAddIngredient.data);
        setShow(true); // Open the modal after successful API call
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleAddIngredient = () => {
    setIngredient("");
    setQuantity("");
    setUnit("");
    setShow(false); // Close the modal after adding an ingredient
  };

  const handleSaveChanges = () => {
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient/Steps",{state:{RemedyId :Nuskha_Id}});
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
        <form>
          <div className="AddIngredient_form-group">
            <input
              type="text"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={handleIngredientChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Add quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Add unit"
              value={unit}
              onChange={handleUnitChange}
              className="form-control"
            />
          </div>
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
