import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { FaClock, FaUtensils, FaStar } from "react-icons/fa";
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";
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

const NutritionInfo = styled.div`
  background-color: ${theme.colors.light};
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  // Existing nutrition info styles
`;

interface RecipeCardProps {
  RecipeId: string;
  recipe_title: string;
  serving_size: number;
  prep_time: number;
  cook_time: number;
  ingredients: Object;
  quantities: Object;
  units: Object;
  steps: Object;
  // Other props like image, ingredients, etc.
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <CardContainer id={props.RecipeId}>
      <CardTitle>{props.recipe_title}</CardTitle>
      <StarRating>{/* Star rating component */}</StarRating>
      <RecipeInfo>
        <RecipeInfoItem>
          <FaUtensils /> {props.serving_size} servings
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Prep: {props.prep_time} min
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Cook: {props.cook_time} min
        </RecipeInfoItem>
        <RecipeInfoItem>
          <FaClock /> Total: {props.prep_time + props.cook_time} min
        </RecipeInfoItem>
      </RecipeInfo>
      <IngredientList {...props}></IngredientList>
      <InstructionList {...props}>{/* Cooking instructions */}</InstructionList>
      <NutritionInfo>{/* Nutrition information */}</NutritionInfo>
    </CardContainer>
  );
};

export default RecipeCard;
