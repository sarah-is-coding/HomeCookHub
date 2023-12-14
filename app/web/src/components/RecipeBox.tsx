import React from "react";
import styled from "styled-components";
import theme from "../theme";
import StarRating from "./StarRating";
import { Link } from "react-router-dom"; // Import Link

const Box = styled(Link)`
  // Change this from div to Link
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none; // Remove underline from link
  color: inherit; // Inherit the color from the parent

  &:hover {
    text-decoration: none; // Optional: Remove underline on hover as well
    color: inherit; // Optional: Ensure the color stays the same on hover
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
  // Format the title to create a URL-friendly string
  const formattedTitle = encodeURIComponent(
    title.replace(/\s+/g, "-").toLowerCase()
  );

  return (
    // Use the Link component with a dynamic path
    <Box to={`/recipe/${formattedTitle}`}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StarRating rating={rating} reviewers={reviewers} />
    </Box>
  );
};

export default RecipeBox;
