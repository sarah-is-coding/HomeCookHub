import React, { useState, useEffect } from "react";
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
  const [recipes, setRecipes] = useState(recipesData) //Initialized with hard-coded data
  const [searchQuery, setSearchQuery] = useState(""); // Initialized with an empty string

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredRecipes = searchQuery
    ? recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery) ||
          recipe.description.toLowerCase().includes(searchQuery)
      )
    : recipes;

  useEffect(() => {
    const fetchRecipes = async () => {
      try{
        const response = await fetch('http://localhost:9000/recipes/');
        const data = await response.json();
        setRecipes(data);
      }
      catch(error){
        console.log(error)
      }
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeSearchContainer>
      <Title>Recipes</Title>
      <SearchBar onSearch={handleSearch} />
      <GridContainer>
        {filteredRecipes.map((recipe) => (
          <RecipeBox
            key={recipe.id}
            title={recipe.title || ""}
            description={recipe.description || ""}
            image={recipe.image || '/assets/default.jpg'}
            rating={recipe.rating || 0}
            reviewers={recipe.reviewers || "0"}
            recipeID={recipe.id || "0"}
          />
        ))}
      </GridContainer>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
