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
      backdrop-filter: blur(5px);
    }
    .reactjs-popup-content {
      border-radius: 15px;
      border: none;
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
  };
  type PopupChildFunction = (close: () => void) => React.ReactNode;
  const popupContent: PopupChildFunction = (close) => (
    <>
      <div className="add-recipe">
        <div className="content">
          <div>Select a saved recipe to add to your meal plan:</div>
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
      description: "Fried Chicken",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    },
    {
      title: "Cereal",
      rating: 2,
      description: "Lucky Charms with oat milk",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    },
    {
      title: "Cereal",
      rating: 5,
      description: "Chicken Alfredo",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    },
    {
      title: "Chocolate Cake",
      rating: 1,
      description: "Cake that's chocolate",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    },
  ];
  const getCurrentDayPlan = (value: Date | Date[] | null) => {
    // This would be where the backend is called to get current recipe card information
    const breakfastRecipeCard: RecipeBoxObject = {
      title: "Cereal",
      rating: 2,
      description: "Lucky Charms with oat milk",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    };
    const lunchRecipeCard: RecipeBoxObject = {
      title: "Fried Chicken",
      rating: 4,
      description: "Garlic crusted fried chicken",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
    };
    const dinnerRecipeCard: RecipeBoxObject = {
      title: "Fettucine Alfredo",
      rating: 5,
      description: "White sauce pasta with grilled chicken",
      reviewers: "",
      image: "/assets/mashed-potatoes.png",
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
              />
            </GridContainer>
          </MealCard>
        </CardsContainer>
      </MealPlanning>
    </>
  );
};

export default PlanningPage;
