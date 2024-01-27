import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import styled from "styled-components";
import theme from "../theme";
import { FaStar, FaArrowDown } from "react-icons/fa";
import recipesData from "../components/recipesData";
// save recipe or add to calender option in recipe page

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

interface ImageContainerProps {
  imageUrl: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TitleOnImage = styled.h1`
  position: relative;
  margin-left: 20px;
  margin-bottom: 10px;
  color: white;
  font-family: ${theme.fonts.title};
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const StarRating = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  color: white;

  svg {
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const JumpToRecipeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  background: ${theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.hover.background};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const BlogDescription = styled.div`
  margin-top: 20px;
  color: ${theme.colors.grey};
  font-size: 18px;
  line-height: 1.8;
  padding: 10px;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
  background-color: ${theme.colors.lightGrey};
  padding: 15px;
  border-radius: 8px;
  // Additional styles for comments
`;

interface RecipeDetails {
  title: string;
  image: string;
  description: string;
  rating: number;
  reviewers: string;
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

      // Find the recipe in recipesData using the normalized title
      const recipeDetails = recipesData.find(
        (r) => r.title.toLowerCase() === normalizedTitle.toLowerCase()
      );

      if (recipeDetails) {
        setRecipe(recipeDetails);
      } else {
        // Handle the case where the recipe is not found
        console.error("Recipe not found");
      }
    }
  }, [params.title]);

  const scrollToRecipeCard = () => {
    const recipeCard = document.getElementById("recipe-card");
    if (recipeCard) {
      recipeCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Prepend PUBLIC_URL to the image path
  const imageUrl = `${process.env.PUBLIC_URL}${recipe.image}`;

  return (
    <PageContainer>
      <ImageContainer imageUrl={imageUrl}>
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
          Jump to Recipe <FaArrowDown />
        </JumpToRecipeButton>
      </ImageContainer>
      <BlogDescription>{recipe.description}</BlogDescription>
      <RecipeCard id="recipe-card" {...recipe} />
      <CommentsSection>{/* Comments and rating section */}</CommentsSection>
    </PageContainer>
  );
};

export default RecipePage;
