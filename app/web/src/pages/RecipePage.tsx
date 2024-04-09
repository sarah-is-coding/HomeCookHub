import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import FirebaseImage from "../components/FirebaseImage"; // Ensure correct import
import styled from "styled-components";
import theme from "../theme";
import { FaStar, FaArrowDown } from "react-icons/fa";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const ImageDisplay = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1; // Ensure overlay is above the image but below text/icons
`;

const TitleOnImage = styled.h1`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-family: ${theme.fonts.title};
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 2; // Ensure text is above the overlay
`;

const StarRating = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  z-index: 2; // Ensure icons are above the overlay

  svg {
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const JumpToRecipeButton = styled.button`
  position: absolute;
  bottom: 20px;
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
  z-index: 2; // Ensure button is above the overlay

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
`;

interface RecipeDetails {
  title: string;
  imageURL: string;
  description: string;
  ingredients: {};
  quantities: {};
  units: {};
  steps: {};
  rating: 4.5;
  reviewers: string;
  serving_size: 2;
  prep_time: 10;
  cook_time: 20;
  id: "mashed-potatoes";
}

const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const params = useParams<{ title?: string }>();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (params.title) {
          var fetchURL =
            "http://localhost:9000/recipes/" + decodeURIComponent(params.title);
          const response = await fetch(fetchURL);
          const recipeData = await response.json();
          setRecipe(recipeData);
        } else {
          console.log("RECIPE ID ERROR");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
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

  console.log("Props going into FirebaseImage from RecipePage:", {
    imagePath: recipe.imageURL, // Adjusted to match the fetched data property name
    altText: recipe.title,
  });

  return (
    <PageContainer>
      <ImageDisplay>
        <FirebaseImage
          imagePath={recipe.imageURL || "/assets/default.jpg"} // Use imageURL from fetched data
          alt={recipe.title || ""}
        />
        <ImageOverlay />
        <TitleOnImage>{recipe.title || ""}</TitleOnImage>
        <StarRating>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                size={24}
                color={ratingValue <= recipe.rating ? "#ffc107" : "#e4e5e9"}
              />
            );
          })}
          <span>({recipe.reviewers || "0"})</span>
        </StarRating>
        <JumpToRecipeButton onClick={scrollToRecipeCard}>
          Jump to Recipe <FaArrowDown />
        </JumpToRecipeButton>
      </ImageDisplay>
      <BlogDescription>{recipe.description || ""}</BlogDescription>
      <RecipeCard RecipeId="recipe-card" {...recipe} />
      <CommentsSection />
    </PageContainer>
  );
};

export default RecipePage;
