import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import "./ProfilePage.css";



const ProfilePage: React.FC = () => {
    return (

      <div className="profilePage">
        <div className="profileHead">
            <div className="profilePicture">
                <img src="https://th.bing.com/th/id/R.d995d728def36a40a261e36bab9f9bfe?rik=LDZuJgLPtIzgZw&riu=http%3a%2f%2fromanroadtrust.co.uk%2fwp-content%2fuploads%2f2018%2f01%2fprofile-icon-png-898.png&ehk=WfpwpBbTdOcQK51xzwmVamkbadbdbzi2tYDYnK8V2hM%3d&risl=&pid=ImgRaw&r=0" className="profileIcon"></img>
            </div>
            <div className="profileTitle">
                <p className="userName">User Name</p>   
            </div>   
        </div>

  
          <div className="profileBar">
            <div className="profileTab">
               <p>Profile Info</p> 
            </div>
            <div className="profileTab">
              <p>Saved Recipes</p>  
            </div>  
        </div>  
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
            <div className="infoContent">
                123-456-7890
            </div>
            </div>
        </div>
        <div id="SavedRecipes">
            test
        </div>
        <div className="edit">
            <div className="editProfile"> Edit Profile</div>
        </div>
        
      </div>
    );
  };

export default ProfilePage;