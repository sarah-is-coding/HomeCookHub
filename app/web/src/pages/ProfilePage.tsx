import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import RecipeBox from "../components/RecipeBox";
import { RecipeBoxObject } from "../models/RecipeBoxObject";
import "./ProfilePage.css";

interface ProfileTabProps {
  isActive: boolean;
}

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  font-family: ${theme.fonts.primary};
`;

const ProfileHeader = styled.div`
  width: 100%;
  background-color: ${theme.colors.light};
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${theme.shadow};
  margin-bottom: 30px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 4px solid ${theme.colors.primary};
  margin-right: 30px;
`;

const UserName = styled.h1`
  font-family: ${theme.fonts.title};
  color: ${theme.colors.black};
`;

const ProfileTabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  position: relative; /* Ensure the pseudo-element is relative to this container */

  /* Adding a pseudo-element to create the underline */
  &:after {
    content: "";
    position: absolute;
    bottom: 0; /* Align at the bottom of the tab container */
    left: 0;
    right: 0;
    height: 3px; /* Thickness of the underline */
    background-color: black; /* Color of the underline */
  }
`;

const ProfileTab = styled.div<ProfileTabProps>`
  font-family: ${theme.fonts.primary};
  padding: 15px 30px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.white};
  color: ${(props) =>
    props.isActive ? theme.colors.white : theme.colors.black};
  border-radius: 25px 25px 0 0;
  box-shadow: ${theme.shadow};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${theme.hover.background};
    color: ${theme.hover.text};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  padding: 20px;
  max-width: 1400px;
`;

const ProfileInfo = styled.div`
  padding: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoHeader = styled.h2`
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`;

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ProfileInfo");

  const savedRecipes: RecipeBoxObject[] = [
    {
      title: "Classic Cereal",
      rating: 4,
      description: "A quick and easy breakfast option. Just add milk!",
      reviewers: "100",
      image: "/assets/mashed-potatoes.png",
      cook_time: 0, // No cooking required
      prep_time: 2, // Just pour it out and enjoy
      serving_size: 1,
    },
    {
      title: "Lucky Charms with Oat Milk",
      rating: 2,
      description:
        "A modern twist on a classic cereal with the creaminess of oat milk.",
      reviewers: "50",
      image: "/assets/mashed-potatoes.png",
      cook_time: 0,
      prep_time: 2,
      serving_size: 1,
    },
    {
      title: "Chicken Alfredo",
      rating: 5,
      description: "Creamy Alfredo sauce over tender chicken and pasta.",
      reviewers: "150",
      image: "/assets/mashed-potatoes.png",
      cook_time: 25,
      prep_time: 15,
      serving_size: 4,
    },
    {
      title: "Chocolate Cake",
      rating: 1,
      description: "Rich, moist chocolate cake for any occasion.",
      reviewers: "200",
      image: "/assets/mashed-potatoes.png",
      cook_time: 45,
      prep_time: 20,
      serving_size: 8,
    },
  ];

  return (
    <ProfilePageContainer>
      <ProfileHeader>
        <ProfilePicture
          src="https://th.bing.com/th/id/R.d995d728def36a40a261e36bab9f9bfe?rik=LDZuJgLPtIzgZw&riu=http%3a%2f%2fromanroadtrust.co.uk%2fwp-content%2fuploads%2f2018%2f01%2fprofile-icon-png-898.png&ehk=WfpwpBbTdOcQK51xzwmVamkbadbdbzi2tYDYnK8V2hM%3d&risl=&pid=ImgRaw&r=0"
          alt="Profile"
        />
        <UserName>Preston Savey</UserName>
      </ProfileHeader>
      <ProfileTabContainer>
        <ProfileTab
          isActive={activeTab === "ProfileInfo"}
          onClick={() => setActiveTab("ProfileInfo")}
        >
          Profile Info
        </ProfileTab>
        <ProfileTab
          isActive={activeTab === "SavedRecipes"}
          onClick={() => setActiveTab("SavedRecipes")}
        >
          Saved Recipes
        </ProfileTab>
      </ProfileTabContainer>
      {activeTab === "ProfileInfo" && (
        <ProfileInfo>
          <InfoSection>
            <InfoHeader>Name:</InfoHeader>
            Preston Savey
          </InfoSection>
          <InfoSection>
            <InfoHeader>Email:</InfoHeader>
            email@gmail.com
          </InfoSection>
          <InfoSection>
            <InfoHeader>Phone Number:</InfoHeader>
            123-456-7890
          </InfoSection>
        </ProfileInfo>
      )}
      {activeTab === "SavedRecipes" && (
        <GridContainer>
          {savedRecipes.map((recipe, index) => (
            <RecipeBox
              key={index}
              recipeID={index.toString()}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              rating={recipe.rating}
              reviewers={recipe.reviewers}
              showSaveButton={false}
              cook_time={recipe.cook_time || 0}
              prep_time={recipe.prep_time || 0}
              serving_size={recipe.serving_size || 1}
            />
          ))}
        </GridContainer>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
