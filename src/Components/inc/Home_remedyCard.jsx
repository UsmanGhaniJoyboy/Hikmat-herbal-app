import React from "react";
import Card from "react-bootstrap/Card";
import "../inc/HomeRemedy.css";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";

const Home_remedyCard = ({
  remedyName,
  hakeemName,
  rating,
  onClick,
  diseaseName,
  perhaiz,
}) => {
  return (
    <Card className="mb-3 home_card">
      <Card.Body>
        <Card.Title className="rem-name">
          Remedy Name:{" "}
          <span style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
            {remedyName}
          </span>
        </Card.Title>
        <Card.Title className="hakeem-name">
          Disease:{" "}
          <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
            {diseaseName}
          </span>
        </Card.Title>
        <Card.Title className="hakeem-name">
          Prescribed by:{" "}
          <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
            {hakeemName}
          </span>
        </Card.Title>
        <Card.Title className="hakeem-name">
          perhaiz:{" "}
          <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
            {perhaiz}
          </span>
        </Card.Title>
        <Rating rating={rating} />
        <Button
          style={{ backgroundColor: "#2195ed", marginTop: "10px" }}
          onClick={onClick}
        >
          See Remedy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Home_remedyCard;
