import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import styled from "styled-components";
import theme from "../theme";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const TitleOnImage = styled.h1`
  position: absolute;
  bottom: 10px;
  left: 20px;
  color: white;
  font-family: ${theme.fonts.title};
`;

const StarRating = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  // Style your star rating component here
`;

const JumpToRecipeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  // Style your button here
`;

const BlogDescription = styled.div`
  margin-top: 20px;
  color: ${theme.colors.grey};
  // Additional styling
`;

const CommentsSection = styled.div`
  margin-top: 20px;
  // Style for comments section
`;

interface RecipeDetails {
  title: string;
  image: string;
  description: string;
  // Include other necessary fields
}

const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const params = useParams<{ title?: string }>();

  useEffect(() => {
    if (params.title) {
      const normalizedTitle = decodeURIComponent(
        params.title.replace(/-/g, " ")
      );

      // Fetch the recipe details
      // Replace with actual fetch call or data retrieval logic
      // For now, using placeholder details
      setRecipe({
        title: normalizedTitle,
        image: "/path/to/image.jpg", // Replace with actual image path
        description: "This is a sample description for the recipe.",
      });
    }
  }, [params.title]);

  const scrollToRecipeCard = () => {
    const recipeCard = document.getElementById("recipe-card");
    if (recipeCard) {
      recipeCard.scrollIntoView();
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <ImageContainer>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
        <TitleOnImage>{recipe.title}</TitleOnImage>
        <StarRating>{/* Star rating component */}</StarRating>
        <JumpToRecipeButton onClick={scrollToRecipeCard}>
          Jump to Recipe
        </JumpToRecipeButton>
      </ImageContainer>
      <BlogDescription>
        {/* Long description with tips etc. */}
        {recipe.description}
      </BlogDescription>
      <RecipeCard id="recipe-card" {...recipe} />
      <CommentsSection>{/* Comments and rating section */}</CommentsSection>
    </PageContainer>
  );
};

export default RecipePage;
