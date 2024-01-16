import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import RecipeBox from "../components/RecipeBox";
import recipesData from "../components/recipesData";

const RecipeSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.title};
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
`;

const RecipeSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Initialized with an empty string

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredRecipes = searchQuery
    ? recipesData.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery) ||
          recipe.description.toLowerCase().includes(searchQuery)
      )
    : recipesData;

  return (
    <RecipeSearchContainer>
      <Title>Recipes</Title>
      <SearchBar onSearch={handleSearch} />
      <GridContainer>
        {filteredRecipes.map((recipe) => (
          <RecipeBox
            key={recipe.title}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            rating={recipe.rating}
            reviewers={recipe.reviewers}
          />
        ))}
      </GridContainer>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
