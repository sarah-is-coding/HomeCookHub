import React from "react";
import styled from "styled-components";
import theme from "../theme";

// Additional components and styles
import { FaClock, FaUtensils } from "react-icons/fa";

const CardContainer = styled.div`
  background: ${theme.colors.white};
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: ${theme.fonts.primary};
`;

const CardTitle = styled.h2`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
  margin-bottom: 20px;
`;

const StarRating = styled.div`
  // Existing star rating styles
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RecipeInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const IngredientList = styled.ul`
  // Existing ingredient list styles
`;

const InstructionList = styled.ol`
  // Existing instruction list styles
`;

const NutritionInfo = styled.div`
  // Existing nutrition info styles
`;

interface RecipeCardProps {
  id: string;
  title: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  // Other props like image, ingredients, etc.
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <CardContainer id={props.id}>
      <CardTitle>{props.title}</CardTitle>
      <StarRating>{/* Star rating component */}</StarRating>
      <RecipeInfo>
        <RecipeInfoItem>
          <FaUtensils /> {props.servings} servings
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Prep: {props.prepTime}
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Cook: {props.cookTime}
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Total: {props.totalTime}
        </RecipeInfoItem>
      </RecipeInfo>
      <IngredientList>{/* Ingredients */}</IngredientList>
      <InstructionList>{/* Cooking instructions */}</InstructionList>
      <NutritionInfo>{/* Nutrition information */}</NutritionInfo>
    </CardContainer>
  );
};

export default RecipeCard;
