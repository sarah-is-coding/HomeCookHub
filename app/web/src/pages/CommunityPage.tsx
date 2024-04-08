import React from "react";
import styled from "styled-components";
import theme from "../theme";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; // Align items to start for a higher placement
  padding-top: 10vh; // Adds some space from the top, adjust as needed
  height: 90vh; // Adjust height to move content up
  background-color: ${theme.colors.white}; // Set the page background to white
`;

const ComingSoonBanner = styled.div`
  text-align: center;
  font-size: 3rem; // Larger font size for emphasis
  color: ${theme.colors.primary}; // Use primary color for the text
  background-color: ${theme.colors
    .light}; // Light color for the banner background
  padding: 20px 40px; // Increased padding for a larger appearance
  border-radius: 10px; // Soften the corners a bit more
  box-shadow: ${theme.shadow}; // Apply theme shadow for depth
  font-family: ${theme.fonts.title}; // Use the title font for a bit of flair
`;

const CommunityPage = () => {
  return (
    <PageContainer>
      <ComingSoonBanner>Coming Soon</ComingSoonBanner>
    </PageContainer>
  );
};

export default CommunityPage;
