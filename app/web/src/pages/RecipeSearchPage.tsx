import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import RecipeBox from "../components/RecipeBox";
import recipesData from "../components/recipesData";
import { Link } from "react-router-dom"; // Import Link for navigation
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

const AddRecipeButton = styled(Link)`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: white;
  border-radius: 10%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: ${theme.colors.black};
  font-size: 1.5rem;
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
        console.log(merged);
        setRecipeScores(
          merged
            .sort((a, b) =>
              a.score < b.score ? 1 : b.score < a.score ? -1 : 0
            )
            .slice(0, 20)
        );
      });
    } catch (error) {
      console.log(error);
    }
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
      <AddRecipeButton to="/add-recipe">Add Recipe</AddRecipeButton>
      <SearchBar onSearch={handleSearch} />
      <GridContainer>
        {recipeScore.map((recipe) => (
          <RecipeBox
            key={recipe.id}
            title={recipe.title || ""}
            description={recipe.description || ""}
            image={recipe.imageURL || "/assets/default.jpg"}
            rating={recipe.rating || 0}
            reviewers={recipe.reviewers || "0"}
            recipeID={recipe.id || "0"}
            cook_time={recipe.cook_time || 0}
            prep_time={recipe.prep_time || 0}
            serving_size={recipe.serving_size || 1}
            showSaveButton={true}
          />
        ))}
      </GridContainer>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
