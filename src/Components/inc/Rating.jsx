import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  // Ensure the rating is a number between 0 and 5
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fullStar = index < Math.floor(rating);
    const halfStar = index < rating && index >= Math.floor(rating);
    return (
      <span key={index}>
        {fullStar ? (
          <FaStar size={20} color="#ffc107" style={{ marginRight: 2 }} />
        ) : halfStar ? (
          <FaStarHalfAlt size={20} color="#ffc107" style={{ marginRight: 2 }} />
        ) : (
          <FaRegStar size={20} color="#e4e5e9" style={{ marginRight: 2 }} />
        )}
      </span>
    );
  });

  return <div>{stars}</div>;
};

export default Rating;
