// components/StarRating.tsx

import React from "react";
import styled from "styled-components";

const StarsContainer = styled.div`
  display: flex;
  justify-content: center; // Center horizontally
  align-items: center;
  font-size: 1.2rem;
  margin-top: 10px; // Add some space above the star rating
`;

const Reviewers = styled.span`
  margin-left: 5px;
  font-size: 1rem;
`;

interface StarRatingProps {
  rating: number; // Actual rating value out of 5
  reviewers: string; // Number of reviewers, e.g., "5k"
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewers }) => {
  const totalStars = 5;

  /* 
    The renderStars function iterates over the total number of stars.
    For each star, it checks:
    - If the index is less than the floor of the rating, it renders a filled star.
    - If the index is equal to the floor of the rating and the decimal part of the rating is 0.5 or more, it renders a half-filled star.
    - Otherwise, it renders an empty star.
    This logic should correctly handle ratings like 4.5, displaying four filled stars, one half-filled star, and the remaining as empty stars.
  */

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
        stars.push(<i key={i} className="bi bi-star-half"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  return (
    <StarsContainer>
      {renderStars()}
      <Reviewers>{reviewers}</Reviewers>
    </StarsContainer>
  );
};

export default StarRating;
