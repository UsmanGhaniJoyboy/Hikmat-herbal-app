import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  const [hovered, setHovered] = useState(false);
  const [clickedRating, setClickedRating] = useState(rating); // Add this line

  // Ensure the rating is a number between 0 and 5
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fullStar = index < Math.floor(clickedRating);
    const halfStar = index === Math.floor(clickedRating) && clickedRating % 1 !== 0;
    return (
      <span
        key={index}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          const x = e.clientX - rect.left; //x position within the element.
          const width = rect.right - rect.left;
          const newRating = x < width / 2 ? index + 0.5 : index + 1;
          setClickedRating(newRating); // Update the clickedRating state
          console.log(`Rating: ${newRating}`);
        }}
        style={{ position: "relative", cursor: "pointer" }}
      >
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

  return (
    <div style={{ position: "relative" }}>
      {hovered && (
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
