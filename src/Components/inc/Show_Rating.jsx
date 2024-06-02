import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

const Show_Rating = ({ rating }) => {
  const [hovered, setHovered] = useState(false);
  const [clickedRating, setClickedRating] = useState(rating || 0);

  useEffect(() => {
    setClickedRating(rating || 0);
  }, [rating]);

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    let star;

    if (starNumber <= clickedRating) {
      star = <FaStar size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else if (starNumber - clickedRating < 1 && starNumber - clickedRating > 0) {
      star = <FaStarHalf size={20} color="#ffc107" style={{ marginRight: 2 }} />;
    } else {
      star = <FaRegStar size={20} color="black" style={{ marginRight: 2 }} />; // Changed to white color
    }

    return (
      <span
        key={index}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative" }}
      >
        {star}
      </span>
    );
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {stars}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '10px' }}>
        {clickedRating > 0 ? clickedRating.toFixed(1) : "No Rating"}
      </div>
    </div>
  );
};

export default Show_Rating;
