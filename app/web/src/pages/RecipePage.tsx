import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../theme";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: ${theme.colors.grey};
`;

interface RecipeDetails {
  title: string;
  image: string;
  description: string;
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

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Title>{recipe.title}</Title>
      <Image src={recipe.image} alt={recipe.title} />
      <Description>{recipe.description}</Description>
      {/* Add other recipe details here */}
    </PageContainer>
  );
};

export default RecipePage;
