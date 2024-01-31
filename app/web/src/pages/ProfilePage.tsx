import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import "./ProfilePage.css";
import RecipeBox from "../components/RecipeBox";
import { RecipeBoxObject } from "../models/RecipeBoxObject";



const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("ProfileInfo");
    const GridContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      padding: 30px;
      width: 100%;
      max-width: 1400px;
    `;
    const savedRecipe1: RecipeBoxObject = {
        title: 'Cereal',
        rating: 4,
        description: 'Fried Chicken',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
    }
    const savedRecipe2: RecipeBoxObject = {
        title: 'Cereal',
        rating: 2,
        description: 'Lucky Charms with oat milk',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
    }
    const savedRecipe3: RecipeBoxObject = {
        title: 'Cereal',
        rating: 5,
        description: 'Chicken Alfredo',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
    }
    const savedRecipe4: RecipeBoxObject = {
        title: 'Chocolate Cake',
        rating: 1,
        description: 'Cake thats chocolate',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
    }
    const savedRecipeArray: RecipeBoxObject[] = [];
    savedRecipeArray.push(savedRecipe1);
    savedRecipeArray.push(savedRecipe2);
    savedRecipeArray.push(savedRecipe3);
    savedRecipeArray.push(savedRecipe4);
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (

      <div className="profilePage">
        <div className="profileHead">
            <div className="profilePicture">
                <img src="https://th.bing.com/th/id/R.d995d728def36a40a261e36bab9f9bfe?rik=LDZuJgLPtIzgZw&riu=http%3a%2f%2fromanroadtrust.co.uk%2fwp-content%2fuploads%2f2018%2f01%2fprofile-icon-png-898.png&ehk=WfpwpBbTdOcQK51xzwmVamkbadbdbzi2tYDYnK8V2hM%3d&risl=&pid=ImgRaw&r=0" className="profileIcon"></img>
            </div>
            <div className="profileTitle">
                <p className="userName">PrestonSavey</p>   
            </div>   
        </div>
          <div className="profileBar">
            <div className={`profileTab ${activeTab === "ProfileInfo" ? "active" : ""}`}>
               <p onClick={() => handleTabClick("ProfileInfo")}>Profile Info</p> 
            </div>
            <div className={`profileTab ${activeTab === "SavedRecipes" ? "active" : ""}`}>
              <p onClick={() => handleTabClick("SavedRecipes")}>Saved Recipes</p>  
            </div>  
        </div>  
        {activeTab === "ProfileInfo" && (
        <div id="ProfileInfo" className="profileInfo">
            <div className="info">
               <div className="infoHeader">
                <b>Name: </b>
            </div>
            <div className="infoContent">
                Preston Savey
            </div> 
            </div>
            <div className="info">
            <div className="infoHeader">
                <b>Email: </b> 
            </div>
            <div className="infoContent">
                email@gmail.com
            </div>
            </div>
            <div className="info">
            <div className="infoHeader"> 
                <b> Phone Number:</b> 
            </div>
            <div className="infoContent lastContent">
                123-456-7890
            </div>
            </div>
        </div>
        )}
        {activeTab === "SavedRecipes" && (
        <div id="SavedRecipes" className="savedRecipes">
            <GridContainer>
                <RecipeBox title={savedRecipeArray[0].title} description={savedRecipeArray[0].description} image={savedRecipeArray[0].image} rating={savedRecipeArray[0].rating} reviewers={savedRecipeArray[0].reviewers}></RecipeBox>
                <RecipeBox title={savedRecipeArray[1].title} description={savedRecipeArray[1].description} image={savedRecipeArray[1].image} rating={savedRecipeArray[1].rating} reviewers={savedRecipeArray[1].reviewers}></RecipeBox>
                <RecipeBox title={savedRecipeArray[2].title} description={savedRecipeArray[2].description} image={savedRecipeArray[2].image} rating={savedRecipeArray[2].rating} reviewers={savedRecipeArray[2].reviewers}></RecipeBox>
                <RecipeBox title={savedRecipeArray[3].title} description={savedRecipeArray[3].description} image={savedRecipeArray[3].image} rating={savedRecipeArray[3].rating} reviewers={savedRecipeArray[3].reviewers}></RecipeBox>
            </GridContainer>
        </div>
        )}
        <div className="edit">
            <div className="editProfile"> Edit Profile</div>
        </div>
        
      </div>
    );
  };

export default ProfilePage;