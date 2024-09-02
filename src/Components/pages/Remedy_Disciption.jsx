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
          responseIngredient.data &&
          responseUsages.data
        ) {
          setSteps(responseSteps.data);
          setIngredients(responseIngredient.data);
          setUsage(responseUsages.data);
        } else {
          console.error("One or more responses did not return data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const responseComments = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetCommentOfNuskha?nid=${remedy.Nuskhaid}`
        );
        if (responseComments.data) {
          setSaveComments(responseComments.data);
        } else {
          console.error("Comments did not return data.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchIngredientRatings = async () => {
      try {
        const responseRatings = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetNuskhaIngredientRatings?nuskhaId=${remedy.Nuskhaid}`
        );
        if (responseRatings.data) {
          const ingredientRatings = responseRatings.data.IngredientRatings || [];
          const totalUserRatings = responseRatings.data.TotalUserRatings || 0;
          setIngredientRatings(ingredientRatings);
          setTotalUserRatings(totalUserRatings);
        } else {
          console.error("Ingredient ratings did not return data.");
        }
      } catch (error) {
        console.error("Error fetching ingredient ratings:", error);
      }
    };

    fetchData();
    fetchComments();
    fetchIngredientRatings();
  }, [remedy.Nuskhaid]);

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
              <h3>Ingredient</h3>
              <ul>
                {ingredients.map((item, index) => {
                  // Find the rating for the current ingredient
                  const rating = ingredientRatings.find(r => r.IngredientId === item.IngredientId);
                  const averageRating = rating ? (rating.AverageRating || 0) : 0;
                  const isLowRated = averageRating < 3;

                  return (
                    <li
                      key={index}
                      style={{
                        color: isLowRated ? 'red' : 'inherit',
                        fontWeight: isLowRated ? 'bold' : 'normal'
                      }}
                    >
                      {item.IngredientName} <span>{item.ingredientquantity}</span>
                      <span>({item.ingredientunit})</span>
                      <Show_Rating rating={averageRating} />
                    </li>
                  );
                })}
              </ul>
              <div style={{ marginTop: '20px' }}>
                <strong>Total Users Rated: {totalUserRatings}</strong>
              </div>
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
                Average Rating:{" "}
                <Show_Rating rating={averageRating} />
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
