import React, { ChangeEvent, useEffect, useState } from "react";
//import "./PlanningPage.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RecipeCard from "../components/RecipeCard";
import { RecipeBoxObject } from "../models/RecipeBoxObject";
import { DayPlanObject } from "../models/DayPlanObject";
import RecipeBox from "../components/RecipeBox";
import styled, { createGlobalStyle } from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import theme from "../theme";

const PlanningPage: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: ${theme.fonts.primary};
      background-color: ${theme.colors.light};
      color: ${theme.colors.black};
    }
    .react-calendar {
      border: 1px solid ${theme.colors.accentLight}; // Slight border for depth
      font-family: ${theme.fonts.primary};
      width: 90%; // Slightly reduce to ensure it's not too stretched
      max-width: 1024px; // Max width for larger screens
      margin: auto; // Center the calendar
      .react-calendar__navigation button {
        background-color: ${theme.colors.light};
        color: ${theme.colors.primary};
        font-size: 16px;
        padding: 10px;
      }
      .react-calendar__month-view__weekdays {
        text-transform: uppercase;
        color: ${theme.colors.accent};
      }
      .react-calendar__tile {
        border-radius: 8px;
        &:enabled:hover,
        &:enabled:focus {
          background-color: ${theme.colors.accentLight};
          color: ${theme.colors.white};
        }
        &--active {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        }
      }
    }
    .reactjs-popup-overlay {
      backdrop-filter: blur(5px); // Blurs the background for focus on the popup
      background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
    }
    .reactjs-popup-content {
      border-radius: 15px; // Rounded corners
      padding: 20px; // Inner spacing
      background-color: ${theme.colors.white}; // Background color from the theme
      box-shadow: ${theme.shadow}; // Box shadow from the theme
      max-width: 600px; // Maximum width of the popup content
      width: auto; // Adjust width based on content
      margin: 0 auto; // Center the popup content horizontally
    }
    .close-button button {
      color: ${theme.colors.primary}; // Button text color
      background-color: ${theme.colors.white}; // Button background color
      border: 2px solid ${theme.colors.primary}; // Button border
      border-radius: 25px; // Rounded corners for the button
      padding: 10px 20px; // Padding inside the button
      cursor: pointer; // Pointer cursor on hover
      transition: background-color 0.3s, color 0.3s; // Transition for hover effects
    }
    .close-button button:hover {
      color: ${theme.colors.white}; // Button text color on hover
      background-color: ${theme.colors.primary}; // Button background color on hover
    }
    .meal-choice-selection {
      display: inline-block; // Ensures proper spacing and alignment
      margin: 10px 20px; // Adds some space around each meal choice
      padding: 10px 20px; // Makes the clickable area larger
      border-radius: 20px; // Rounded corners for a modern look
      background-color: ${theme.colors.light}; // Default background
      color: ${theme.colors.accent}; // Default text color
      font-weight: bold; // Makes the text stand out
      cursor: pointer; // Changes cursor to indicate clickable
      transition: background-color 0.3s, color 0.3s; // Smooth transition for feedback
    
      &:hover, &:focus {
        background-color: ${theme.colors.primary}; // Highlight on hover/focus
        color: ${theme.colors.white}; // Text color contrast on hover/focus
      }
    }
    
    .meal-choice-selected {
      background-color: ${theme.colors.primary}; // Active state background
      color: ${theme.colors.white}; // Active state text color
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Slight shadow for depth
    }
    
  `;
  // Styled-components for layout and UI elements
  const MealPlanning = styled.div`
    display: flex;
    flex-direction: column; // Keep the horizontal layout.
    justify-content: center; // Center the children horizontally.
    align-items: center; // Center the children vertically.
    text-align: center;
    color: ${theme.colors.black};
    background-color: ${theme.colors.light};
    padding: 20px;
    height: 100vh; // Ensure the container takes the full height of the viewport.
  `;

  const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `;

  const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    overflow-x: auto; // Allows horizontal scrolling if cards exceed the viewport width
  `;

  const MealCard = styled.div`
    width: 100%; // You might want to adjust this depending on the number of cards you want in a row
    max-width: 300px; // Example: Limit the maximum width to keep cards from becoming too large
    border-radius: 10px;
    background-color: ${theme.colors.primary};
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    box-shadow: ${theme.shadow};
    &:hover {
      transform: scale(1.05);
    }
    .card-title {
      padding: 10px;
      font-weight: bold;
      color: ${theme.colors.white};
      font-size: 20px;
    }
  `;

  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 1200px;
  `;

  const AddButton = styled.button`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.primary};
    border-radius: 25px;
    padding: 10px 20px; // Increased padding for better clickability
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
    }
  `;

  const AddButtonStyled = styled(AddButton)`
    margin-top: 10px; // Reduced from 20px to bring it closer to the calendar
    margin-bottom: 10px;
  `;

  const PopupGridContainer = styled(GridContainer)`
    grid-template-columns: repeat(4, 1fr);
  `;

  const CalendarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%; // Ensure it takes the full width of its parent but doesn't push content off-screen
  `;

  const DateInfo: number[][] = [];
  const emptyRecipeCard = {
    title: "",
    rating: 0,
    description: "",
    reviewers: "",
    image: "",
    cookTime: 0, // Default or placeholder value
    prepTime: 0, // Default or placeholder value
    servingSize: 0, // Default or placeholder value
  };
  type PopupChildFunction = (close: () => void) => React.ReactNode;
  const popupContent: PopupChildFunction = (close) => (
    <>
      <div className="add-recipe">
        <div className="content">
          <div>Select a saved recipe to add to your meal plan!</div>
        </div>
        <div>
          <PopupGridContainer className="grid">
            {savedRecipes.map((recipe, index) => (
              <RecipeBox
                key={index}
                recipeID={index.toString()}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                rating={recipe.rating}
                reviewers={recipe.reviewers}
                cookTime={recipe.cookTime} // Ensure these fields are now included in RecipeBoxObject
                prepTime={recipe.prepTime}
                servingSize={recipe.servingSize}
              />
            ))}
          </PopupGridContainer>
        </div>
        <div className="row meal-choice">
          <p className="meal-choice-selection">Breakfast</p>
          <p className="meal-choice-selection">Lunch</p>
          <p className="meal-choice-selection">Dinner</p>
        </div>

        <div className="close-button">
          <button onClick={() => close()}>Save</button>
        </div>
      </div>
    </>
  );
  let [currentDayPlan, setCurrentDayPlan] = useState({
    lunch: emptyRecipeCard,
    breakfast: emptyRecipeCard,
    dinner: emptyRecipeCard,
  });
  const savedRecipes: RecipeBoxObject[] = [
    {
      title: "Cereal",
      rating: 4,
      description: "Quick and easy breakfast",
      reviewers: "",
      image: "/assets/cereal.png",
      cookTime: 0, // Cereal doesn't need cooking
      prepTime: 5, // Time to pour cereal and milk
      servingSize: 1,
    },
    {
      title: "Lucky Charms with Oat Milk",
      rating: 2,
      description: "Lucky Charms cereal with a twist of oat milk",
      reviewers: "",
      image: "/assets/lucky-charms.png",
      cookTime: 0,
      prepTime: 5,
      servingSize: 1,
    },
    {
      title: "Chicken Alfredo",
      rating: 5,
      description: "Creamy Alfredo pasta with succulent chicken pieces",
      reviewers: "",
      image: "/assets/chicken-alfredo.png",
      cookTime: 30, // Assuming it includes pasta cooking and sauce preparation
      prepTime: 15, // Prep for chicken and other ingredients
      servingSize: 4,
    },
    {
      title: "Chocolate Cake",
      rating: 1,
      description: "Rich and moist chocolate cake",
      reviewers: "",
      image: "/assets/chocolate-cake.png",
      cookTime: 45, // Baking time
      prepTime: 20, // Mixing and preparing the batter
      servingSize: 8, // Standard cake size
    },
  ];

  const getCurrentDayPlan = (value: Date | Date[] | null) => {
    // This would be where the backend is called to get current recipe card information
    const breakfastRecipeCard: RecipeBoxObject = {
      title: "Cereal",
      rating: 2,
      description: "Lucky Charms with oat milk",
      reviewers: "",
      image: "/assets/cereal.png",
      cookTime: 0,
      prepTime: 5,
      servingSize: 1,
    };

    const lunchRecipeCard: RecipeBoxObject = {
      title: "Fried Chicken",
      rating: 4,
      description: "Garlic crusted fried chicken",
      reviewers: "",
      image: "/assets/fried-chicken.png",
      cookTime: 40, // Assuming frying and preparation
      prepTime: 20, // Marinating and breading
      servingSize: 4,
    };

    const dinnerRecipeCard: RecipeBoxObject = {
      title: "Fettucine Alfredo",
      rating: 5,
      description: "White sauce pasta with grilled chicken",
      reviewers: "",
      image: "/assets/fettucine-alfredo.png",
      cookTime: 30,
      prepTime: 15,
      servingSize: 4,
    };

    setCurrentDayPlan({
      breakfast: breakfastRecipeCard,
      lunch: lunchRecipeCard,
      dinner: dinnerRecipeCard,
    });
    console.log("day plan changed: " + currentDayPlan.breakfast.title);
  };
  // called when calendar is clicked
  const handleDateChange = (
    value: Date | Date[] | null,
    event: ChangeEvent<any>
  ) => {
    if (value !== null && !Array.isArray(value)) {
      setDate(value);
      console.log("date clicked: " + date.getDate());
      // calls function that returns day plan from backend
      getCurrentDayPlan(value);
    }
  };
  // Ensures that app loads with current date information instead of blank
  useEffect(() => {
    getCurrentDayPlan(date);
  }, []);

  return (
    <>
      <GlobalStyle />
      <MealPlanning>
        <CalendarContainer>
          <Calendar
            onChange={handleDateChange as CalendarProps["onChange"]}
            value={date}
          />
        </CalendarContainer>
        <CenteredContainer>
          <Popup
            trigger={<AddButtonStyled>Add Recipe</AddButtonStyled>}
            modal
            nested
          >
            {popupContent as unknown as React.ReactNode}
          </Popup>
        </CenteredContainer>
        <CardsContainer>
          <MealCard>
            <div className="card-title">Breakfast</div>
            <GridContainer>
              <RecipeBox
                recipeID="20"
                title={currentDayPlan.breakfast.title}
                description={currentDayPlan.breakfast.description}
                image={currentDayPlan.breakfast.image}
                rating={currentDayPlan.breakfast.rating}
                reviewers={currentDayPlan.breakfast.reviewers}
                cookTime={currentDayPlan.breakfast.cookTime} // Assuming these fields are now part of RecipeBoxObject
                prepTime={currentDayPlan.breakfast.prepTime}
                servingSize={currentDayPlan.breakfast.servingSize}
              />
            </GridContainer>
          </MealCard>
          <MealCard>
            <div className="card-title">Lunch</div>
            <GridContainer>
              <RecipeBox
                recipeID="21"
                title={currentDayPlan.lunch.title}
                description={currentDayPlan.lunch.description}
                image={currentDayPlan.lunch.image}
                rating={currentDayPlan.lunch.rating}
                reviewers={currentDayPlan.lunch.reviewers}
                cookTime={currentDayPlan.lunch.cookTime} // Assuming these fields are now part of RecipeBoxObject
                prepTime={currentDayPlan.lunch.prepTime}
                servingSize={currentDayPlan.lunch.servingSize}
              />
            </GridContainer>
          </MealCard>
          <MealCard>
            <div className="card-title">Dinner</div>
            <GridContainer>
              <RecipeBox
                recipeID="22"
                title={currentDayPlan.dinner.title}
                description={currentDayPlan.dinner.description}
                image={currentDayPlan.dinner.image}
                rating={currentDayPlan.dinner.rating}
                reviewers={currentDayPlan.dinner.reviewers}
                cookTime={currentDayPlan.dinner.cookTime} // Assuming these fields are now part of RecipeBoxObject
                prepTime={currentDayPlan.dinner.prepTime}
                servingSize={currentDayPlan.dinner.servingSize}
              />
            </GridContainer>
          </MealCard>
        </CardsContainer>
      </MealPlanning>
    </>
  );
};

export default PlanningPage;
