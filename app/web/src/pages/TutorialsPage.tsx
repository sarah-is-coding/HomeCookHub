// pages/TutorialsPage.tsx
import React from "react";
import styled from "styled-components";

const PageContainer = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url(${process.env.PUBLIC_URL}/assets/backgroundImage.png);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
  position: absolute;
  left: 120px;
  top: 45%;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  text-align: left;
  font-size: 4rem;
`;

const Body = styled.h1`
  color: black;
  position: absolute;
  left: 120px;
  top: 65%;
  transform: translateY(-50%);
  width: calc(100% - 40px);
  text-align: left;
  font-size: 1rem;
`;

const TutorialsPage = () => {
  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default TutorialsPage;
