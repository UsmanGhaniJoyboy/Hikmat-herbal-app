import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, clickable = false }) => {
  const [hovered, setHovered] = useState(false);
  const [clickedRating, setClickedRating] = useState(rating);

  // Ensure the rating is a number between 0 and 5
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fullStar = index < clickedRating;
    return (
      <span
        key={index}
        onMouseEnter={() => clickable && setHovered(true)}
        onMouseLeave={() => clickable && setHovered(false)}
        onClick={() => {
          if (clickable) {
            const newRating = index + 1;
            setClickedRating(newRating); // Update the clickedRating state
            console.log(`Rating: ${newRating}`);
          }
        }}
        style={{ position: "relative", cursor: clickable ? "pointer" : "default" }}
      >
        {fullStar ? (
          <FaStar size={20} color="#ffc107" style={{ marginRight: 2 }} />
        ) : (
          <FaRegStar size={20} color="#e4e5e9" style={{ marginRight: 2 }} />
        )}
      </span>
    );
  });

  return (
    <div style={{ position: "relative" }}>
      {hovered && clickable && (
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: "2px 5px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {clickedRating.toFixed(1)}
        </div>
      )}
      {stars}
    </div>
  );
};

export default Rating;
