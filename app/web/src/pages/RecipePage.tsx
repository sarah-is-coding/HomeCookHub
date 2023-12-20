import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import styled from "styled-components";
import theme from "../theme";
import { FaStar } from "react-icons/fa";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const ImageContainer = styled.div`
  position: relative;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  height: 300px; // Adjust as needed
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent overlay
`;

const TitleOnImage = styled.h1`
  position: relative;
  margin-left: 20px;
  margin-bottom: 10px;
  color: white;
  font-family: ${theme.fonts.title};
`;

const StarRating = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  color: white;
`;

const JumpToRecipeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  // Additional styling for the button
`;

const BlogDescription = styled.div`
  margin-top: 20px;
  color: ${theme.colors.grey};
  font-size: 18px;
  line-height: 1.6;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
  // Additional styling for comments section
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
}

const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const params = useParams<{ title?: string }>();

  useEffect(() => {
    if (params.title) {
      const normalizedTitle = decodeURIComponent(
        params.title.replace(/-/g, " ")
      );

      setRecipe({
        title: normalizedTitle,
        image: "/mashedPotatoes.png", // Set the image path dynamically
        description:
          "Are you wondering what to do with those leftover mashed potatoes? Transform them into a delicious and easy-to-make Mashed Potato Bake! This recipe not only gives your leftovers a tasty makeover but also serves as a perfect side dish for any meal.",
        rating: 4.5,
        reviewers: 100,
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
      <ImageContainer imageUrl={recipe.image}>
        <ImageOverlay />
        <TitleOnImage>{recipe.title}</TitleOnImage>
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
      <BlogDescription>{recipe.description}</BlogDescription>
      <RecipeCard id="recipe-card" {...recipe} />
      <CommentsSection>{/* Comments and rating section */}</CommentsSection>
    </PageContainer>
  );
};

export default RecipePage;
