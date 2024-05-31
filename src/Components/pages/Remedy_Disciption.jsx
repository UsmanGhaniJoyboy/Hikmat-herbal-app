import React, { useEffect, useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../StyleSheets/Rem-Disc.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Rating from "../inc/Rating";

const Remedy_Disciption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { remedy } = location.state;
  const [steps, setSteps] = useState([]);
  const [Ingredient, setIngredient] = useState([]);
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    console.log(remedy);
    console.log("Nuskha id aginst selecting remedy", remedy.Nuskhaid);
    const fetchSteps = async () => {
      try {
        const responseSteps = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetSteps?Nuskaid=${remedy.Nuskhaid}`
        );
        const responseIngredient = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetIngredients?Nuskaid=${remedy.Nuskhaid}`
        );
        const responseUsages = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/Getusage?Nuskaid=${remedy.Nuskhaid}`
        );
        if (
          responseSteps.data &&
          responseSteps.data &&
          responseIngredient.data &&
          responseIngredient.data &&
          responseUsages.data &&
          responseUsages.data !== "NO DATA"
        ) {
          setSteps(responseSteps.data);
          setIngredient(responseIngredient.data);
          setUsage(responseUsages.data);
          console.log(`steps are fetching ${steps}`);
          console.log(`steps are fetching ${Ingredient}`);
          console.log(`steps are fetching ${usage}`);
        }
      } catch (error) {
        console.error("Error fetching Nuskhas:", { steps });
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
    fetchSteps();
  }, []);

  const handleSubmitbtn = () => {
    // Add your submit button logic here
  };

  return (
    <div>
      <CustomeNav />
      <Custome_heading title={remedy.NuskhaName} />
      <div className="rem-container">
        <Container fluid="md" className="inner-cont">
          <Row className="justify-content-md-center ing-steps">
            <Col md={8}>
              <h3>Steps</h3>
              <ol>
                {steps.map((item, index) => (
                  <li key={index}>{item.Nuskhasteps}</li>
                ))}
              </ol>
              <h3>Usage</h3>
              <ol>
                {usage.map((item, index) => (
                  <li key={index}>{item.Nuskhausage}</li>
                ))}
              </ol>
            </Col>
            <Col md={2}>
              <h3>Ingredient</h3>
              <ul>
                {Ingredient.map((item, index) => (
                  <li key={index}>
                    {item.IngredientName} <span>{item.ingredientquantity}</span>
                    <span>({item.ingredientunit})</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="justify-content-md-center rating-product">
            <Col md={8} className="Rating-disc">
              <span
                style={{
                  flexDirection: "row",
                  display: "flex",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Rating: <Rating rating={remedy.AverageRating} clickable={false} showNumber={true} />
              </span>
            </Col>
            <Col md={2}>
              <div className="btn-pro">
                {/* <Button
                  onClick={() => navigate("/Remedies/RemediesDetails")}
                  type="submit"
                >
                  View Product
                </Button> */}
              </div>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ marginTop: "20px" }}
          >
            <Col md={8}>
              <div className="quesiton-cont">
                <div className="search-container-Rem">
                  <input
                    type="text"
                    placeholder="Comment"
                    className="search-input"
                  />
                </div>
                <div className="qst-btn">
                  <Button
                    type="submit"
                    className="question-btn"
                    onClick={handleSubmitbtn}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={2}>
              <Button
                onClick={() => navigate("/Home/Remedy_Disciption/Comment_Reply")}
                type="Submit"
                className="question-btn sub"
              >
                Comment & Reply
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Remedy_Disciption;
