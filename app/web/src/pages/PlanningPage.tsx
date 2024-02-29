import React, { ChangeEvent, useEffect, useState } from "react";
import "./PlanningPage.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RecipeCard from "../components/RecipeCard";
import { RecipeBoxObject} from "../models/RecipeBoxObject";
import { DayPlanObject } from "../models/DayPlanObject";
import RecipeBox from "../components/RecipeBox";
import styled from "styled-components";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const PlanningPage: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const GridContainer = styled.div`
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
      padding: 20px;
      width: 100%;
      max-width: 1200px;
    `;
    const PopupGridContainer = styled(GridContainer)`
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 20px;
      width: 100%;
      max-width: 1200px;
  `;
    const DateInfo: number[][] = [];
    const emptyRecipeCard = {
      title: '',
        rating: 0,
        description: '',
        reviewers: '',
        image: ''
    }
    type PopupChildFunction = (close: () => void) => React.ReactNode;
    const popupContent: PopupChildFunction = (close) => (
      
      <>
        <div className='add-recipe'>
          <div className='content'>
              <div>
                Select a saved recipe to add to your meal plan:
              </div>
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
            

          <div className='close-button'>
            <button onClick={() => close()}>
              Save
            </button>
          </div>
        </div>
      </>
      
    );
    let [currentDayPlan, setCurrentDayPlan] = useState({
      lunch: emptyRecipeCard,
      breakfast: emptyRecipeCard,
      dinner: emptyRecipeCard});
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
        title: 'Cereal',
        rating: 2,
        description: 'Lucky Charms with oat milk',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
      }
      const lunchRecipeCard: RecipeBoxObject = {
        title: 'Fried Chicken',
        rating: 4,
        description: 'Garlic crusted fried chicken',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
      }
      const dinnerRecipeCard: RecipeBoxObject = {
        title: 'Fettucine Alfredo',
        rating: 5,
        description: 'White sauce pasta with grilled chicken',
        reviewers: '',
        image: '/assets/mashed-potatoes.png'
      }
      setCurrentDayPlan ({
        breakfast: breakfastRecipeCard,
        lunch: lunchRecipeCard,
        dinner: dinnerRecipeCard
      });
      console.log( "day plan changed: " + currentDayPlan.breakfast.title);
    }
    // called when calendar is clicked
    const handleDateChange = (value: Date | Date[] | null, event: ChangeEvent<any>) => {
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
      <div className='meal-planning'>
        <div className='calendar-plus-cards'>
        <div className="calendar-with-tags">
          <span><b> Select a Date: </b></span>
        <div className='calendar'>
          <Calendar onChange={handleDateChange as CalendarProps['onChange']} value={date} />
        </div>
        {/* <p className='text-center'>
          <span className='bold'>Selected Date:</span>{' '}
          {date.toDateString()}
        </p> */}
        </div>
        
        <div className="meals row">
            <div className="meal-card"> 
              <div className='card-title'>Breakfast</div> 
              <GridContainer className="grid">
                <RecipeBox recipeID="20" title={currentDayPlan.breakfast.title} description={currentDayPlan.breakfast.description} image={currentDayPlan.breakfast.image} rating={currentDayPlan.breakfast.rating} reviewers={currentDayPlan.breakfast.reviewers}></RecipeBox>
              </GridContainer>
      
            </div>
            <div className="meal-card"> 
              <div className='card-title'>Lunch</div> 
              <GridContainer className="grid">
                <RecipeBox recipeID="20" title={currentDayPlan.lunch.title} description={currentDayPlan.lunch.description} image={currentDayPlan.lunch.image} rating={currentDayPlan.lunch.rating} reviewers={currentDayPlan.lunch.reviewers}></RecipeBox>
              </GridContainer>
            </div>
            <div className="meal-card"> 
              <div className='card-title'>Dinner</div> 
              <GridContainer className="grid">
                <RecipeBox recipeID="20" title={currentDayPlan.dinner.title} description={currentDayPlan.dinner.description} image={currentDayPlan.dinner.image} rating={currentDayPlan.dinner.rating} reviewers={currentDayPlan.dinner.reviewers}></RecipeBox>
              </GridContainer>
            </div>
        </div>
        <div>
          
        <div className="row rowItem">
      <Popup trigger={<p className="add-button">Add Recipe</p>} modal nested>
        {(popupContent as unknown) as React.ReactNode}
      </Popup>
    </div>
        
        </div>
        </div>
        
        
      </div>
      
    );
  };

export default PlanningPage;