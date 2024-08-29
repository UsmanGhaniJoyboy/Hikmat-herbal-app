import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

const Rating = ({ rating, clickable = false, showNumber = false, totalUserRated = 0, showTotalUsers = false }) => {
  const [hovered, setHovered] = useState(false);
  const [clickedRating, setClickedRating] = useState(rating || 0);

  useEffect(() => {
    setClickedRating(rating || 0);
  }, [rating]);

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    let star;

    if (starNumber <= clickedRating) {
      star = <FaStar key={index} size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else if (starNumber - clickedRating < 1 && starNumber - clickedRating > 0) {
      star = <FaStarHalf key={index} size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else {
      star = <FaRegStar key={index} size={20} color="#e4e5e9" style={{ marginRight: 2 }} />;
    }

    return (
      <span
        key={index}
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
          {clickedRating > 0 ? clickedRating.toFixed(1) : "No Rating"}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {stars}
      </div>
      {showTotalUsers && totalUserRated > 0 && (
        <div style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold', marginTop: '5px' }}>
          {totalUserRated} Ratings
        </div>
      )}
    </div>
  );
};

export default Rating;
