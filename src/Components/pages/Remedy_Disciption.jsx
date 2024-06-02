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
import ClickableRating from "../inc/ClickableRating";

const Remedy_Disciption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { remedy } = location.state;
  const { patientComing } = location.state;
  const [steps, setSteps] = useState([]);
  const [Ingredient, setIngredient] = useState([]);
  const [usage, setUsage] = useState([]);
  const [comments, setComments] = useState("");
  const [saveComments, setSaveComments] = useState([]);
  const [checkRatingperson, setcheckRatingperson] = useState("");
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    console.log(remedy);
    console.log("Nuskha id aginst selecting remedy", remedy.Nuskhaid);
    console.log("Patient id, where are you?", patientComing.id);

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
          setIngredient(responseIngredient.data);
          setUsage(responseUsages.data);
        } else {
          console.error("One or more responses did not return data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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

    const fetchComments = async () => {
      try {
        const responseComments = await axios.get(
          `http://localhost/Hakeemhikmat/api/Addnushka/GetCommentOfNuskha?nid=${remedy.Nuskhaid}`
        );
        if (responseComments.data) {
          setSaveComments(responseComments.data);
        } else {
          console.error("One or more responses did not return data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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

    fetchData();
    fetchComments();
  }, [remedy.Nuskhaid]);

  useEffect(() => {
    console.log("Fetched steps: ", steps);
  }, [steps]);

  useEffect(() => {
    console.log("Fetched ingredients: ", Ingredient);
  }, [Ingredient]);

  useEffect(() => {
    console.log("Fetched usages: ", usage);
  }, [usage]);

  useEffect(() => {
    console.log("Fetched comments: ", saveComments);
  }, [saveComments]);

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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
                Rating:{" "}
                <Rating
                  rating={remedy.AverageRating}
                  clickable={false}
                  showNumber={true}
                />
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
                <ol>
                  {saveComments.map((comment, index) => (
                    <li style={{ fontSize: "1.2rem" }} key={index}>
                      <p>{comment.Comment}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Col>
            <Col md={2}>
              <Button
                onClick={() =>
                  navigate("/Home/Remedy_Disciption/Comment_Reply")
                }
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
