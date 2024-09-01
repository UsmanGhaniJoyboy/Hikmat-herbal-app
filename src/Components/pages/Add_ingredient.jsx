import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import "../StyleSheets/Add_ingredient.css";
import { useNavigate } from "react-router-dom";
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
  const handleShow = () => setShow(true);

  const handleUpdateForm = () => {
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient/UpdateIngredients", {
      state: { Nuskha_Id: Nuskha_Id, ingredientId: ingredientId },
    });
  };

  const submitIngredient = async () => {
    const formData = new FormData();
    formData.append("name", ingredient);
    formData.append("publicity", "public");

    console.log("Ingredient's Name:", ingredient);

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

      const ingId = responseAddIng.data;
      setIngredientId(ingId);
      console.log("Ingredient added, ID: ", ingId);

      const formData2 = new FormData();
      formData2.append("quantity", quantity);
      formData2.append("unit", unit);
      formData2.append("r_id", Nuskha_Id);
      formData2.append("i_id", ingId);

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
      handleClose();
      handleAddIngredient();
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

  const Move_next = () => {
    navigate("/HakeemProfile/Add_Remedies/Add_ingredient/Steps", {
      state: { RemedyId: Nuskha_Id },
    });
  };

  return (
    <div>
      <CustomeNav />
      <Custome_heading title="Add Ingredient" />
      <div className="add-Ing-container text-center">
        <form>
          <div className="ingredient-cont">
            <div className="AddIngredient_form-group">
              <input
                type="text"
                placeholder="Add ingredient"
                value={ingredient}
                onChange={handleIngredientChange}
                className="form-control input"
              />
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Check the information</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleUpdateForm}>
                    Update Form
                  </Button>
                  <Button variant="primary" onClick={submitIngredient}>
                    Add Ingredient
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
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
        <button
          onClick={handleShow}
          style={{ width: "50%", marginBottom: "15px" }}
        >
          Add Ingredient
        </button>

        <button className="ingredienbtn" onClick={Move_next}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Add_ingredient;
