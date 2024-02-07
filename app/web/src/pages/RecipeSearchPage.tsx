import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import RecipeBox from "../components/RecipeBox";
import recipesData from "../components/recipesData";
import { calculateWordSimilarity } from "../SearchLogic";

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
  const [recipes, setRecipes] = useState(recipesData); //Initialized with hard-coded data
  const [searchQuery, setSearchQuery] = useState(""); // Initialized with an empty string
  const [recipeScore, setRecipeScores] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    try {
      var simularityScores = calculateWordSimilarity(query, recipes);

      simularityScores.then((scores: any) => {
        var merged = [];
        for (let i = 0; i < recipes.length; i++) {
          if (recipes[i].title !== undefined) {
            merged.push({
              ...recipes[i],
              ...scores.find((score: any) => score.title === recipes[i].title),
            });
          }
        }

        setRecipeScores(merged.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)).slice(0, 20));
      });
    } catch(error) {
      console.log(error);}
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:9000/recipes/");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeSearchContainer>
      <Title>Recipes</Title>
      <SearchBar onSearch={handleSearch} />
      <GridContainer>
        {recipeScore.map((recipe) => (
          <RecipeBox
            key={recipe.id}
            title={recipe.title || ""}
            description={recipe.description || ""}
            image={recipe.image || ""}
            rating={recipe.score || 0}
            reviewers={recipe.score || "0"}
            recipeID={recipe.id || "0"}
          />
        ))}
      </GridContainer>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
