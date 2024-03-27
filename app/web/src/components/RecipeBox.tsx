import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme";
import StarRating from "./StarRating";
import FirebaseImage from "./FirebaseImage";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Box = styled(Link)`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  max-width: 100%;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const Title = styled.h2`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
`;

const Description = styled.p`
  color: ${theme.colors.grey};
`;

const SaveButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  display: block;
  margin: 10px auto 0;
  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

interface RecipeBoxProps {
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewers: string;
  recipeID: string;
  cookTime: number;
  prepTime: number;
  servingSize: number;
  showSaveButton?: boolean;
}

const RecipeBox: React.FC<RecipeBoxProps> = ({
  title,
  description,
  image,
  rating,
  reviewers,
  recipeID,
  cookTime,
  prepTime,
  servingSize,
  showSaveButton = false,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const saveRecipe = async () => {
    if (!userId) {
      alert("You must be logged in to save recipes.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9000/save_recipe/${encodeURIComponent(userId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cook_time: cookTime,
            prep_time: prepTime,
            recipe_id: recipeID,
            recipe_title: title,
            serving_size: servingSize,
          }),
        }
      );
      if (response.ok) {
        setIsSaved(true);
        alert("Recipe added to your saved recipes!");
      } else {
        alert("Failed to save the recipe. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save the recipe:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box to={`/recipes/${encodeURIComponent(recipeID)}`}>
      <FirebaseImage imagePath={image} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StarRating rating={rating} reviewers={reviewers} />
      {showSaveButton && !isSaved && (
        <SaveButton
          onClick={(e) => {
            e.preventDefault(); // Prevent default to avoid navigating away
            saveRecipe();
          }}
        >
          +
        </SaveButton>
      )}
    </Box>
  );
};

export default RecipeBox;
