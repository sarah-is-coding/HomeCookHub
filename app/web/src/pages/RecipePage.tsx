import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import styled from "styled-components";
import theme from "../theme";

// Additional styles and components
import { FaStar } from "react-icons/fa";

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
  rating: number;
  reviewers: number;
  servings: number;
  prepTime: number;
  cookTime: number;
  totalTime: number;
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
        rating: 4.5, // Placeholder value
        reviewers: 100, // Placeholder value
        servings: 2,
        prepTime: 10,
        cookTime: 20,
        totalTime: 30,
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
        {/* Existing image and title logic */}
        <StarRating>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                size={24}
                color={ratingValue <= recipe.rating ? "#ffc107" : "#e4e5e9"}
              />
            );
          })}
          <span>({recipe.reviewers})</span>
        </StarRating>
        <JumpToRecipeButton onClick={scrollToRecipeCard}>
          Jump to Recipe
        </JumpToRecipeButton>
      </ImageContainer>
      <BlogDescription>{/* Existing blog description logic */}</BlogDescription>
      <RecipeCard id="recipe-card" {...recipe} />
      <CommentsSection>{/* Comments and rating section */}</CommentsSection>
    </PageContainer>
  );
};

export default RecipePage;
