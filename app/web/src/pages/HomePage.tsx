// pages/HomePage.tsx

import React from "react";
import styled from "styled-components";
import theme from "../theme";

const HomeContainer = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.title};
  position: absolute;
  left: 120px; // Adjust as needed for padding from the left edge
  top: 45%;
  transform: translateY(-50%); // To center it vertically
  width: calc(
    100% - 40px
  ); // Assuming you want to keep 20px padding on both sides
  text-align: left;
  font-size: 4rem;
`;

const Body = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.primary};
  position: absolute;
  left: 120px; // Adjust as needed for padding from the left edge
  top: 65%;
  transform: translateY(-50%); // To center it vertically
  width: calc(
    100% - 40px
  ); // Assuming you want to keep 20px padding on both sides
  text-align: left;
  font-size: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh; // This makes the image container cover half of the viewport height
  background-image: url(${process.env
    .PUBLIC_URL}/assets/backgroundImage.png); // Use PUBLIC_URL
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
          Your Ultimate
          <br />
          Home Cook Companion
        </Title>
        <Body>
          Seamless Meal Planning, Recipe Discovery, Automated Grocery Lists and
          more
        </Body>
      </ImageContainer>
    </HomeContainer>
  );
};

export default HomePage;
