import React from "react";
import styled from "styled-components";
import theme from "../theme";

const CardContainer = styled.div`
  background: ${theme.colors.white};
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
`;

const StarRating = styled.div`
  // Style for star rating
`;

const RecipeInfo = styled.div`
  // Style for recipe info like servings, calories, etc.
`;

const IngredientList = styled.ul`
  // Style for ingredient list
`;

const InstructionList = styled.ol`
  // Style for instruction list
`;

const NutritionInfo = styled.div`
  // Style for nutrition info
`;

interface RecipeCardProps {
  id: string;
  title: string;
  // Other props like image, servings, ingredients, etc.
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <CardContainer id={props.id}>
      <CardTitle>{props.title}</CardTitle>
      <StarRating>{/* Star rating component */}</StarRating>
      <RecipeInfo>
        {/* Recipe info like servings, prep time, etc. */}
      </RecipeInfo>
      <IngredientList>{/* Ingredients */}</IngredientList>
      <InstructionList>{/* Cooking instructions */}</InstructionList>
      <NutritionInfo>{/* Nutrition information */}</NutritionInfo>
    </CardContainer>
  );
};

export default RecipeCard;
