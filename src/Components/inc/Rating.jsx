import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

const Rating = ({ rating, clickable = false, showNumber = false }) => {
  const [hovered, setHovered] = useState(false);
  const [clickedRating, setClickedRating] = useState(rating);

  useEffect(() => {
    setClickedRating(rating);
  }, [rating]);

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    let star;

    if (starNumber <= clickedRating) {
      star = <FaStar size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else if (starNumber - clickedRating < 1 && starNumber - clickedRating > 0) {
      star = <FaStarHalf size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else {
      star = <FaRegStar size={20} color="#e4e5e9" style={{ marginRight: 2 }} />;
    }

    return (
      <span
        key={index}
        onMouseEnter={() => clickable && setHovered(true)}
        onMouseLeave={() => clickable && setHovered(false)}
        onClick={() => {
          if (clickable) {
            const newRating = starNumber;
            setClickedRating(newRating);
            console.log(`Rating: ${newRating}`);
          }
        }}
        style={{ position: "relative", cursor: clickable ? "pointer" : "default" }}
      >
        {star}
      </span>
    );
  });

  return (
    <div style={{ position: "relative" }}>
      {showNumber && (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {rating.toFixed(1)}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {stars}
      </div>
    </div>
  );
};

export default Rating;
