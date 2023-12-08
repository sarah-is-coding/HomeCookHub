// components/RecipeBox.tsx

import React from "react";
import styled from "styled-components";
import theme from "../theme";
import StarRating from "./StarRating";

const Box = styled.div`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
`;

const Description = styled.p`
  color: ${theme.colors.grey};
`;

interface RecipeBoxProps {
  title: string;
  description: string;
  image: string;
  rating: number; // Actual rating out of 5
  reviewers: string; // Number of reviewers, e.g., "5k"
}

const RecipeBox: React.FC<RecipeBoxProps> = ({
  title,
  description,
  image,
  rating,
  reviewers,
}) => {
  return (
    <Box>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StarRating rating={rating} reviewers={reviewers} />
    </Box>
  );
};

export default RecipeBox;
