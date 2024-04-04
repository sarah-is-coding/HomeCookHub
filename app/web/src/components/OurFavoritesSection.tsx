import React from "react";
import styled from "styled-components";
import RecipeBox from "./RecipeBox";
import theme from "../theme";

const Section = styled.section`
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;
  margin: auto;
  max-width: 1200px;
  background-color: ${theme.colors.light};
  box-shadow: ${theme.shadow};
  border-radius: 16px;
`;

const FeaturedRecipe = styled.div`
  grid-column: span 8;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: ${theme.shadow};
`;

const SmallRecipesContainer = styled.div`
  grid-column: span 4;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
`;

const SmallRecipe = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: ${theme.shadow};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

interface Recipe {
  id: string;
  recipe_title: string;
  description: string;
  imageURL: string; // Updated to match expected field
  rating: number;
  reviewers: string;
  cook_time: number; // Added
  prep_time: number; // Added
  serving_size: number; // Added
}

interface OurFavoritesSectionProps {
  recipes: Recipe[];
}

const OurFavoritesSection: React.FC<OurFavoritesSectionProps> = ({
  recipes,
}) => {
  console.log("OurFavoritesSection Recipes:", recipes);
  return (
    <Section>
      <h2
        style={{
          gridColumn: "span 12",
          color: theme.colors.primary,
          fontFamily: theme.fonts.title,
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Our Current Favorites
      </h2>
      {recipes.length > 0 && (
        <>
          <FeaturedRecipe>
            <RecipeBox
              key={recipes[0].id}
              title={recipes[0].recipe_title}
              description={recipes[0].description}
              image={recipes[0].imageURL || "/assets/default.jpg"} // Ensure fallback for missing imageURL
              rating={recipes[0].rating}
              reviewers={recipes[0].reviewers}
              recipeID={recipes[0].id}
              cook_time={recipes[0].cook_time} // Pass the new props
              prep_time={recipes[0].prep_time}
              serving_size={recipes[0].serving_size}
              showSaveButton={true}
            />
          </FeaturedRecipe>
          <SmallRecipesContainer>
            {recipes.slice(1).map((recipe, index) => (
              <SmallRecipe key={recipe.id}>
                <RecipeBox
                  title={recipe.recipe_title}
                  description={recipe.description}
                  image={recipe.imageURL || "/assets/default.jpg"} // Ensure fallback for missing imageURL
                  rating={recipes[0].rating}
                  reviewers={recipes[0].reviewers}
                  recipeID={recipes[0].id}
                  cook_time={recipes[0].cook_time} // Pass the new props
                  prep_time={recipes[0].prep_time}
                  serving_size={recipes[0].serving_size}
                  showSaveButton={true}
                />
              </SmallRecipe>
            ))}
          </SmallRecipesContainer>
        </>
      )}
    </Section>
  );
};

export default OurFavoritesSection;
