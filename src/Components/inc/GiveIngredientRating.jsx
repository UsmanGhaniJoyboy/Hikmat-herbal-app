import React, { useState } from "react";
import axios from "axios";

const GiveIngredientRating = ({ userId, nuskhaId, ingredientId }) => {
  const [rating, setRating] = useState(0); // Store current rating

  // Function to handle rating click
  const handleRatingClick = async (newRating) => {
    setRating(newRating); // Update the rating state

    // Automatically send the rating to the server after user clicks a star
    try {
      const response = await axios.post(
        "http://localhost/Hakeemhikmat/api/Addnushka/PostIngredientRating", // Adjust URL as needed
        null,
        {
          params: {
            user_id: userId,
            nuskha_id: nuskhaId,
            ingredient_id: ingredientId,
            rating: newRating,
          },
        }
      );
      console.log("Rating submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "2rem",
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
          }}
          onClick={() => handleRatingClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default GiveIngredientRating;
