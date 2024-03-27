import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OurFavoritesSection from "../components/OurFavoritesSection";
import theme from "../theme";

const HomeContainer = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background-image: url(${process.env.PUBLIC_URL}/assets/backgroundImage.png);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  position: absolute;
  left: 120px;
  top: 40%;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  text-align: left;
  font-size: 4rem;
  font-family: ${theme.fonts.title};
`;

const Body = styled.h1`
  color: ${theme.colors.black};
  position: absolute;
  left: 120px;
  top: 65%;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  text-align: left;
  font-size: 1rem;
  font-family: ${theme.fonts.primary};
`;

const SectionSpacing = styled.div`
  width: 100%;
  padding-top: 40px; // Adjust this value as needed for more or less space
`;

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  rating: number;
  reviewers: string; // Made optional
  cookTime: number; // Added
  prepTime: number; // Added
  servingSize: number; // Added
}

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:9000/recipes/");
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const favoriteRecipes = recipes.slice(0, 5);

  return (
    <HomeContainer>
      <ImageContainer>
        <Title>
          Your Ultimate
          <br />
          Home Cook Companion
        </Title>
        <Body>
          Seamless Meal Planning, Recipe Discovery, Automated Grocery Lists and
          more
        </Body>
      </ImageContainer>
      <SectionSpacing>
        <OurFavoritesSection recipes={favoriteRecipes} />
      </SectionSpacing>
    </HomeContainer>
  );
};

export default HomePage;
