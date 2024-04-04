import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme";
import RecipeBox from "../components/RecipeBox";
import { RecipeBoxObject } from "../models/RecipeBoxObject";
import "./ProfilePage.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: black;
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
  const [user, setUser] = useState<any>(null);
  const [savedRecipes, setSavedRecipes] = useState<RecipeBoxObject[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid); // Set the userId from the current user
        fetch(`http://localhost:9000/users/${currentUser.uid}`) // Use userId to fetch user data
          .then((response) => response.json())
          .then((data) => {
            setUser({
              displayName: data.Username, // Adjust according to your backend data structure
              email: data.Email, // Adjust according to your backend data structure
              photoURL: currentUser.photoURL || "https://defaultimageurl.png",
            });
            setSavedRecipes(data.Saved_Recipe); // Adjust according to your backend data structure
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } else {
        console.log("User is not logged in.");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <ProfilePageContainer>
      <ProfileHeader>
        <ProfilePicture
          src={
            user?.photoURL ||
            "https://th.bing.com/th/id/R.d995d728def36a40a261e36bab9f9bfe?rik=LDZuJgLPtIzgZw&riu=http%3a%2f%2fromanroadtrust.co.uk%2fwp-content%2fuploads%2f2018%2f01%2fprofile-icon-png-898.png&ehk=WfpwpBbTdOcQK51xzwmVamkbadbdbzi2tYDYnK8V2hM%3d&risl=&pid=ImgRaw&r=0"
          }
          alt="Profile"
        />
        <UserName>{user?.displayName || "No Name Provided"}</UserName>
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
            {user?.displayName || "No Name Provided"}
          </InfoSection>
          <InfoSection>
            <InfoHeader>Email:</InfoHeader>
            {user?.email || "No Email Provided"}
          </InfoSection>
          {/* Additional information sections can be added here */}
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
              cook_time={recipe.cook_time}
              prep_time={recipe.prep_time}
              serving_size={recipe.serving_size}
              showSaveButton={false}
            />
          ))}
        </GridContainer>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
