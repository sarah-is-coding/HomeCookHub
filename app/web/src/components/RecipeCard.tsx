import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { FaClock, FaUtensils, FaStar } from "react-icons/fa";
// save recipe or add to calender option in recipe page

const CardContainer = styled.div`
  background: ${theme.colors.white};
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: ${theme.shadow};
  font-family: ${theme.fonts.primary};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
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
  svg {
    margin-right: 5px;
    color: ${theme.colors.primary};
  }
`;

const IngredientList = styled.ul`
  // Existing ingredient list styles
`;

const InstructionList = styled.ol`
  // Existing instruction list styles
`;

const NutritionInfo = styled.div`
  background-color: ${theme.colors.light};
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  // Existing nutrition info styles
`;

interface RecipeCardProps {
  RecipeId: string;
  title: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  // Other props like image, ingredients, etc.
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <CardContainer id={props.RecipeId}>
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
