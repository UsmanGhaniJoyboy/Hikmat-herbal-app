import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../inc/Card.css";
import { Link } from "react-router-dom";

const Remedy_card = ({
  title,
  description,
  Comment,
  Add_product,
  Rating,
  link,
}) => {
  // Define state for the card component
  const [commentCount, setCommentCount] = useState(0);

  // Function to handle incrementing the comment count
  const handleIncrementComment = () => {
    setCommentCount(commentCount + 1);
  };

  // Function to handle incrementing the product count
 

  return (
    <div>
      <Card className="custome_card">
        <Card.Body className="card_1">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text className="card_rating">{Rating}</Card.Text>
          <div className="card_btn">
            {/* Display comment count and provide a button to increment it */}
            <Link className="card_link" onClick={handleIncrementComment}>
              {`${Comment} (${commentCount})`}
            </Link>
            {/* Display product count and provide a button to increment it */}
            <Link
              className="card_link"
              to={link}
            >
              {`${Add_product}`}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Remedy_card;
