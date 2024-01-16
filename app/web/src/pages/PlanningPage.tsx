import React, { ChangeEvent, useState } from "react";
import "./PlanningPage.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RecipeCard from "../components/RecipeCard";
import { RecipeBoxObject} from "../models/RecipeBoxObject";
import { DayPlanObject } from "../models/DayPlanObject";
import RecipeBox from "../components/RecipeBox";



const PlanningPage: React.FC = () => {
    const [date, setDate] = useState(new Date());
    
    const DateInfo: number[][] = [];
    const emptyRecipeCard = {
      title: '',
        rating: 0,
        description: '',
        reviewers: '',
        image: ''
    }
    let [currentDayPlan, setCurrentDayPlan] = useState({
      lunch: emptyRecipeCard,
      breakfast: emptyRecipeCard,
      dinner: emptyRecipeCard});
    
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
    const handleDateChange = (value: Date | Date[] | null, event: ChangeEvent<any>) => {
      if (value !== null && !Array.isArray(value)) {
        setDate(value);
        console.log("date clicked: " + date.getDate());
        getCurrentDayPlan(value);
      }
    };
  
    return (
      <div className='meal-planning'>
        <div className='calendar'>
          <Calendar onChange={handleDateChange as CalendarProps['onChange']} value={date} />
        </div>
        <p className='text-center'>
          <span className='bold'>Selected Date:</span>{' '}
          {date.toDateString()}
        </p>
        <div className="meals row">
            <div className="meal-card"> 
              <div>Breakfast</div> 
              <RecipeBox title={currentDayPlan.breakfast.title} description={currentDayPlan.breakfast.description} image={currentDayPlan.breakfast.image} rating={currentDayPlan.breakfast.rating} reviewers={currentDayPlan.breakfast.reviewers}></RecipeBox>
            </div>
            <div className="meal-card"> 
              <div>Lunch</div> 
              <RecipeBox title={currentDayPlan.lunch.title} description={currentDayPlan.lunch.description} image={currentDayPlan.lunch.image} rating={currentDayPlan.lunch.rating} reviewers={currentDayPlan.lunch.reviewers}></RecipeBox>
            </div>
            <div className="meal-card"> 
              <div>Dinner</div> 
              <RecipeBox title={currentDayPlan.dinner.title} description={currentDayPlan.dinner.description} image={currentDayPlan.dinner.image} rating={currentDayPlan.dinner.rating} reviewers={currentDayPlan.dinner.reviewers}></RecipeBox>
            </div>
        </div>
        
      </div>
    );
  };

export default PlanningPage;