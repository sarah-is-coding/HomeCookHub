// pages/RecipeSearchPage.tsx

import React from "react";
import styled from "styled-components";
import theme from "../theme";

const RecipeSearchContainer = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.title};
  position: absolute;
  top: 15%;
  transform: translateY(-50%); // To center it vertically
  width: calc(
    100% - 40px
  ); // Assuming you want to keep 20px padding on both sides
  text-align: center;
  font-size: 4rem;
`;

const Body = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.primary};
  position: absolute;
  left: 120px; // Adjust as needed for padding from the left edge
  top: 65%;
  transform: translateY(-50%); // To center it vertically
  width: calc(
    100% - 40px
  ); // Assuming you want to keep 20px padding on both sides
  text-align: left;
  font-size: 1rem;
`;

const RecipeSearchPage: React.FC = () => {
  return (
    <RecipeSearchContainer>
      <Title>Recipes</Title>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
