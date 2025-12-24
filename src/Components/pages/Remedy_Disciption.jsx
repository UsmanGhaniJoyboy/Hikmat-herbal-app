import React, { useState, useEffect } from "react";
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
import Show_Rating from "../inc/Show_Rating";
import ClickableRating from "../inc/ClickableRating";
import Nav2_forPatient from "../inc/Nav2_forPatient";
import GiveIngredientRating from "../inc/GiveIngredientRating";

const Remedy_Disciption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { remedy } = location.state;
  const { patientComing } = location.state;
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [usage, setUsage] = useState([]);
  const [comments, setComments] = useState("");
  const [saveComments, setSaveComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(remedy.AverageRating || 0);
  const [ingredientRatings, setIngredientRatings] = useState([]);
  const [totalUserRatings, setTotalUserRatings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch steps, usage, comments, and ingredients
        const responseSteps = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetSteps?Nuskaid=${remedy.Nuskhaid}`
        );
        const responseUsages = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/Getusage?Nuskaid=${remedy.Nuskhaid}`
        );
        const responseComments = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetCommentOfNuskha?nid=${remedy.Nuskhaid}`
        );
        const responseIngredients = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/getIngredietnts?NuskhaId=${remedy.Nuskhaid}`
        );

        // Check if the data is present and correctly structured
        if (
          responseSteps.data &&
          responseUsages.data &&
          responseComments.data &&
          responseIngredients.data
        ) {
          setSteps(responseSteps.data);
          setUsage(responseUsages.data);
          setSaveComments(responseComments.data);
          setIngredients(responseIngredients.data);
        } else {
          console.error("One or more responses did not return data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Ingredient Rating
    const fetchIngredientRating = async () => {
      try {
        const IngRatingResponse = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetAverageRatings?nuskha_id=${remedy.Nuskhaid}`
        );
        if (IngRatingResponse.data) {
          setIngredientRatings(IngRatingResponse.data); // Set the fetched data
        } else {
          console.error("No data returned for ingredient ratings.");
        }
      } catch (error) {
        console.error("Error fetching ingredient ratings:", error);
      }
    };

    fetchData();
    fetchIngredientRating();
  }, [remedy.Nuskhaid]);

  // Log ingredient ratings after state update
  useEffect(() => {
    if (ingredientRatings.length > 0) {
      console.log("Ingredient Ratings: ", ingredientRatings);
    }
  }, [ingredientRatings]);

  const handleRating = (rate) => {
    setUserRating(rate);
    console.log(`User rated: ${rate}`);
  };

  const handleSubmitbtn = async () => {
    try {
      const formData = new FormData();
      formData.append("n_id", remedy.Nuskhaid);
      formData.append("u_id", patientComing.id);
      formData.append("rating", userRating);
      formData.append("comments", comments);

      const responseSubmit = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/ratingcomments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Nuskha data added successfully:", responseSubmit.data);

      // Fetch comments again to update the list
      const getUpdatedComments = await axios.get(
        `http://localhost/Hakeemhikmat/api/Addnushka/GetCommentOfNuskha?nid=${remedy.Nuskhaid}`
      );
      setSaveComments(getUpdatedComments.data);
      setComments("");

      // Fetch updated average rating
      const responseAverageRating = await axios.get(
        `http://localhost/Hakeemhikmat/api/Addnushka/GetAverageRating?Nuskaid=${remedy.Nuskhaid}`
      );
      setAverageRating(responseAverageRating.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <Nav2_forPatient />
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
              <h3>Ingredients</h3>
              <ul>
                {Array.isArray(ingredients) && ingredients.length > 0 ? (
                  ingredients.map((item, index) => {
                    const ingredientRating = ingredientRatings.find(
                      (rating) => rating.IngredientId === item.ingredient_id
                    ); // Find the rating for the current ingredient

                    const isLowRating =
                      ingredientRating && ingredientRating.AverageRating < 3;

                    return (
                      <li key={item.ingredient_id}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: isLowRating ? "red" : "black", // Highlight ingredient name in red if rating < 3
                          }}
                        >
                          {item.ingName}
                        </span>
                        <br />
                        <span>{item.quanity}</span>
                        <span>({item.unit})</span>
                        <br />
                        {ingredientRating ? (
                          <div>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: isLowRating ? "red" : "black", // Highlight rating in red if rating < 3
                              }}
                            >
                              ({ingredientRating.AverageRating}) : Rating
                            </span>
                          </div>
                        ) : (
                          <span>No rating yet.</span>
                        )}
                        {/* GiveIngredientRating component placed here */}
                        <GiveIngredientRating
                          userId={patientComing.id}
                          nuskhaId={remedy.Nuskhaid}
                          ingredientId={item.ingredient_id}
                        />
                      </li>
                    );
                  })
                ) : (
                  <li>No ingredients available.</li>
                )}
              </ul>

              {/* <div style={{ marginTop: "20px" }}>
                <strong>Total Users Rated: {totalUserRatings}</strong>
              </div> */}
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
                Average Rating: <Show_Rating rating={averageRating} />
              </span>
            </Col>
            <Col md={2}>
              <div className="rating_set">
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  Rate:{" "}
                </span>
                <ClickableRating onRate={handleRating} />
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
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
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
              <div className="comments-section">
                <h3>Comments</h3>
                {saveComments.length > 0 ? (
                  <ol>
                    {[...saveComments].reverse().map((comment, index) => (
                      <li style={{ fontSize: "1.2rem" }} key={index}>
                        <p>{comment.Comment}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
              </div>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Remedy_Disciption;
