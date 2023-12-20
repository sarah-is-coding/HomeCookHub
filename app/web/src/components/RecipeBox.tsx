import React from "react";
import styled from "styled-components";
import theme from "../theme";
import StarRating from "./StarRating";
import { Link } from "react-router-dom"; // Import Link

const Box = styled(Link)`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
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
  rating: number;
  reviewers: string;
}

const RecipeBox: React.FC<RecipeBoxProps> = ({
  title,
  description,
  image,
  rating,
  reviewers,
}) => {
  const formattedTitle = encodeURIComponent(
    title.replace(/\s+/g, "-").toLowerCase()
  );

  return (
    <Box to={`/recipes/${formattedTitle}`}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StarRating rating={rating} reviewers={reviewers} />
    </Box>
  );
};

export default RecipeBox;
