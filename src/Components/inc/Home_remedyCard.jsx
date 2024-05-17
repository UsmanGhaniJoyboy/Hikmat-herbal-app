import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../inc/HomeRemedy.css";
import Rating from "./Rating";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Home_remedyCard = ({
  remedyName,
  hakeemName,
  rating,
  onClick,
  nuskhaId,
}) => {

  const navigate = useNavigate();


  return (
    <Card className="mb-3 home_card">
      <Card.Body>
        <Card.Title className="rem-name">
          Remedy Name :{" "}
          <span style={{ fontWeight: "normal", fontSize: "1.2rem" }}>

            {remedyName}
          </span>
        </Card.Title>
        <Card.Title className="hakeem-name">
          Prescribed by:{" "}
          <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
            {hakeemName}
          </span>{" "}
        </Card.Title>
        {/* <Card.Text>Rating : <span style={{fontWeight:'normal',fontSize:"1rem"}}>{rating}</span></Card.Text> */}
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
