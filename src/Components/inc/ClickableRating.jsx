import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const   ClickableRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (rate) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(star)}
        >
          {star <= (hover || rating) ? (
            <FaStar size={20} color="#ffc107" style={{ marginRight: 2 }} />
          ) : (
            <FaRegStar size={20} color="#e4e5e9" style={{ marginRight: 2 }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default ClickableRating;
