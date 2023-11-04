// pages/HomePage.tsx

import React from "react";
import styled from "styled-components";
import theme from "../theme";

const HomeContainer = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  position: absolute;
  left: 35px; // Adjust as needed for padding from the left edge
  top: 50%;
  transform: translateY(-50%); // To center it vertically
  width: calc(
    100% - 40px
  ); // Assuming you want to keep 20px padding on both sides
  text-align: left;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh; // This makes the image container cover half of the viewport height
  background-image: url("/backgroundImage.png"); // Access image from the public directory
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <ImageContainer>
        <Title>
          Your Ultimate Home Cook Companion: Seamless
          <br />
          Meal Planning, Recipe Discovery, Automated
          <br />
          Grocery Lists and more
        </Title>
      </ImageContainer>
    </HomeContainer>
  );
};

export default HomePage;
