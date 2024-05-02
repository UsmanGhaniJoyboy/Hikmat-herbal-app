import React, { useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../StyleSheets/Rem-Disc.css";
import search from "../images/nounsearch.png";
import { FaStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Remedy_Disciption = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  return (
    <div>
      <CustomeNav />
      <Custome_heading title="Remedy Discription" />
      <div className="rem-container">
        <h3 className="text-center fw-bold">Hair Fall Remedy</h3>
        <Container fluid="md" className="inner-cont">
          <Row className="justify-content-md-center ing-steps ">
            <Col md={8}>
              <h3>Steps</h3>
              <ol>
                <li>Take yogurt in a bowl</li>
                <li>Add olive oil and mix it well</li>
                <li>Separate egg white and add to the mixture</li>
                <li>
                  Apply on Dry hair and leave it for 30 minutes before washing
                  it
                </li>
              </ol>
            </Col>
            <Col md={2}>
              <h3>Ingredient</h3>
              <ul>
                <li>Yogurt(500ml)</li>
                <li>Olive oil(10g)</li>
                <li>Egg(1)</li>
              </ul>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={8} className="Rating-disc">
              <div className="rating">
                <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                  Rating :{" "}
                </span>
                {[...Array(4)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <FaStar
                      style={{ marginLeft: "10px" }}
                      className="star"
                      color="orange"
                      size={20}
                    />
                  );
                })}
              </div>
            </Col>
            <Col md={2}>
              <div className="btn-pro">
                <Button
                  onClick={() => navigate("/Remedies/RemediesDetails")}
                  type="submit"
                >
                  View Product
                </Button>
              </div>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center "
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
                  <Button type="submit" className="question-btn">
                    Submit
                  </Button>
                </div>
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
          <Row
            className="justify-content-md-center "
            style={{ marginTop: "20px" }}
          >
            <Col md={10}>
              <h3>Comment & Reply</h3>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Remedy_Disciption;
