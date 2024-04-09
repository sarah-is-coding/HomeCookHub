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
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface MealPlanEntry {
  day: string | FirestoreTimestamp; // Adjust based on actual data
  imageURL: string;
  meal: string;
  recipe_id: string;
  title: string;
}

interface MealPlans {
  [year: number]: {
    [month: number]: MealPlanEntry[];
  };
}

const PlanningPage: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [savedRecipes, setSavedRecipes] = useState<RecipeBoxObject[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [mealPlans, setMealPlans] = useState<MealPlans>({});
  const [currentUser, setCurrentUser] = useState<any>(null);

  const recipesPerPage = 4; // How many recipes you want to show per page
  const totalPages = Math.ceil(savedRecipes.length / recipesPerPage); // Total number of pages

  // Function to handle clicking the next arrow
  const handleNext = () => {
    setCurrentPage((prevCurrent) => (prevCurrent + 1) % totalPages);
  };

  // Function to handle clicking the previous arrow
  const handlePrevious = () => {
    setCurrentPage(
      (prevCurrent) => (prevCurrent - 1 + totalPages) % totalPages
    );
  };

  // Calculate the recipes to display based on the current page
  const displayedRecipes = savedRecipes.slice(
    currentPage * recipesPerPage,
    (currentPage + 1) * recipesPerPage
  );

  const fetchAndCacheMealPlans = async (date: Date, userId: string) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDay = 1;
    const endDay = new Date(year, month + 1, 0).getDate();

    const baseUrl = "http://localhost:9000/users";
    const url = `${baseUrl}/${userId}/${(month + 1)
      .toString()
      .padStart(2, "0")}/${startDay.toString().padStart(2, "0")}/${year}/${(
      month + 1
    )
      .toString()
      .padStart(2, "0")}/${endDay.toString().padStart(2, "0")}/${year}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data: MealPlanEntry[] = await response.json();

      setMealPlans((prev) => ({
        ...prev,
        [year]: {
          ...prev[year],
          [month]: data,
        },
      }));
    } catch (error) {
      console.error(
        `Error fetching meal plans for userId: ${userId}, date: ${date.toISOString()}, URL: ${url}`,
        error
      );
    }
  };

  const recipeIDtoRecipeBoxObject = async (
    recipeId: string
  ): Promise<RecipeBoxObject> => {
    const url = `http://localhost:9000/recipes/${recipeId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok for recipe ID ${recipeId}`
        );
      }
      const data = await response.json();

      // Prepare the object to be returned
      const recipeBoxObject = {
        title: data.title,
        description: data.description,
        image: data.imageURL, // Adjust according to actual returned field names
        rating: data.rating,
        reviewers: data.reviewers,
        cook_time: data.cook_time,
        prep_time: data.prep_time,
        serving_size: data.serving_size,
        recipeID: recipeId, // Note: Adjust if 'recipeID' should not be included
      };

      return recipeBoxObject;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw error; // Rethrow or handle as appropriate for further error handling
    }
  };

  useEffect(() => {}, [mealPlans]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetch(`http://localhost:9000/users/${currentUser.uid}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setSavedRecipes(
              Array.isArray(data.Saved_Recipes) ? data.Saved_Recipes : []
            );
          })
          .catch((error) => {
            console.error("Error fetching saved recipes:", error);
            setSavedRecipes([]);
          });
      } else {
        console.log("User is not logged in.");
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Move fetching logic here to ensure it executes after user login
        await fetchAndCacheMealPlans(new Date(), user.uid)
          .then(() => {})
          .catch((error) => {
            console.error("Error fetching meal plans:", error);
          });

        // Assuming handleDateChange does not depend on external state that isn't set yet
        handleDateChange(new Date());
      } else {
        setCurrentUser(null);
        console.log("User is not logged in.");
        // Handle case where user logs out or is not logged in
      }
    });

    return () => unsubscribe();
  }, []); // This effect depends on component mounting and unmounting only.

  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: ${theme.fonts.primary};
      // background-color: ${theme.colors.light};
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
    // background-color: ${theme.colors.light};
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
    width: 100%;
    height: 550px;
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
    }3
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
    cook_time: 0, // Default or placeholder value
    prep_time: 0, // Default or placeholder value
    serving_size: 0, // Default or placeholder value
  };
  type PopupChildFunction = (close: () => void) => React.ReactNode;
  const popupContent: PopupChildFunction = (close) => (
    <>
      <div className="add-recipe">
        <div className="content">
          <div>Select a saved recipe to add to your meal plan!</div>
        </div>
        <div>
          {/* Add navigation arrow for previous page */}
          {currentPage > 0 && <button onClick={handlePrevious}>&lt;</button>}
          <PopupGridContainer className="grid">
            {/* Only display recipes for the current page */}
            {displayedRecipes.map((recipe, index) => (
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
              />
            ))}
          </PopupGridContainer>
          {/* Add navigation arrow for next page */}
          {currentPage < totalPages - 1 && (
            <button onClick={handleNext}>&gt;</button>
          )}
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

  const getCurrentDayPlan = async () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const plansForDay = mealPlans[year]?.[month]?.filter((entry) => {
      let entryDate;

      // Check if day is a FirestoreTimestamp and convert accordingly
      if (typeof entry.day === "object" && "seconds" in entry.day) {
        entryDate = new Date(entry.day.seconds * 1000); // Firestore Timestamp
      } else {
        entryDate = new Date(entry.day); // Assuming entry.day is a string
      }

      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();
      const entryDay = entryDate.getDate();

      return entryYear === year && entryMonth === month && entryDay === day;
    });

    if (plansForDay && plansForDay.length > 0) {
      let dayPlan = {
        breakfast: emptyRecipeCard,
        lunch: emptyRecipeCard,
        dinner: emptyRecipeCard,
      };

      for (const plan of plansForDay) {
        try {
          const recipeDetails = await recipeIDtoRecipeBoxObject(plan.recipe_id);
          if (plan.meal.toLowerCase() === "breakfast") {
            dayPlan.breakfast = recipeDetails;
          } else if (plan.meal.toLowerCase() === "lunch") {
            dayPlan.lunch = recipeDetails;
          } else if (plan.meal.toLowerCase() === "dinner") {
            dayPlan.dinner = recipeDetails;
          }
        } catch (error) {
          console.error("Error fetching recipe details:", error);
        }
      }

      setCurrentDayPlan(dayPlan);
    } else {
      setCurrentDayPlan({
        breakfast: emptyRecipeCard,
        lunch: emptyRecipeCard,
        dinner: emptyRecipeCard,
      });
    }
  };

  const handleDateChange = (selectedDate: Date | Date[] | null) => {
    if (!selectedDate || Array.isArray(selectedDate) || !currentUser) {
      return;
    }

    const newDate = selectedDate as Date;
    setDate(newDate); // Update the currently selected date.

    // Check if meal plans for the year and month of the new date are already loaded.
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    if (mealPlans[year] && mealPlans[year][month]) {
      // If meal plans for this month are already cached, update the view for the selected day.
      getCurrentDayPlan();
    } else {
      // If not, fetch and cache the meal plans for this month, then update the view.
      fetchAndCacheMealPlans(newDate, currentUser.uid)
        .then(() => {
          // Ensure this method updates the state correctly to reflect the changes.

          getCurrentDayPlan();
        })
        .catch((error) => {
          console.error(
            `Failed to fetch meal plans for ${year}-${month + 1}:`,
            error
          );
        });
    }
  };

  useEffect(() => {
    // This function now correctly depends on `date`, `currentUser`, and `mealPlans`.
    // It will run when any of these dependencies change.
    if (currentUser) {
      getCurrentDayPlan();
    }
  }, [date, currentUser, mealPlans]); // Added dependencies here.

  // Ensures that app loads with current date information instead of blank
  useEffect(() => {
    getCurrentDayPlan();
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
                cook_time={currentDayPlan.breakfast.cook_time} // Assuming these fields are now part of RecipeBoxObject
                prep_time={currentDayPlan.breakfast.prep_time}
                serving_size={currentDayPlan.breakfast.serving_size}
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
                cook_time={currentDayPlan.lunch.cook_time} // Assuming these fields are now part of RecipeBoxObject
                prep_time={currentDayPlan.lunch.prep_time}
                serving_size={currentDayPlan.lunch.serving_size}
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
                cook_time={currentDayPlan.dinner.cook_time} // Assuming these fields are now part of RecipeBoxObject
                prep_time={currentDayPlan.dinner.prep_time}
                serving_size={currentDayPlan.dinner.serving_size}
              />
            </GridContainer>
          </MealCard>
        </CardsContainer>
      </MealPlanning>
    </>
  );
};

export default PlanningPage;
