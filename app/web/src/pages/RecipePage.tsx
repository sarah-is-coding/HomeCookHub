import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../theme";
// Import any additional components or services needed

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
  const params = useParams<{ title?: string }>(); // Notice the change here

  useEffect(() => {
    if (params.title) {
      const normalizedTitle = decodeURIComponent(
        params.title.replace(/-/g, " ")
      );

      // Fetch the recipe details based on normalizedTitle
      // This is a placeholder for your fetch logic
      const fetchRecipe = async () => {
        // Replace this with actual fetch call or data retrieval logic
        setRecipe({
          title: normalizedTitle, // Replace with actual title from data
          image: "/path/to/image.jpg",
          description: "This is a sample description for the recipe.",
        });
      };

      fetchRecipe();
    }
  }, [params.title]); // Dependency on params.title

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
