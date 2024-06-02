import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating"; // Adjust the import path as necessary
import "../inc/Card.css";
import Show_Rating from "../inc/Show_Rating";

const Remedy_card = ({
  title,
  Rating: ratingValue,
  link,
  Comment
}) => {
  const [commentCount, setCommentCount] = useState(0);

  const handleIncrementComment = () => {
    setCommentCount(commentCount + 1);
  };

  return (
    <div>
      <Card className="custome_card" >
        <Card.Body className="card_1" >
          <Card.Title>{title}</Card.Title>
          <div className="card_rating">
            <Show_Rating rating={parseFloat(ratingValue)} />
          </div>
          <div className="card_btn">
            <Link className="card_link" onClick={handleIncrementComment}>
              {`${Comment} (${commentCount})`}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Remedy_card;
