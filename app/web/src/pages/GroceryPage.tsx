/* eslint-disable no-restricted-globals */
import React, { ChangeEvent, useEffect, useState } from "react";
import "./GroceryPage.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RecipeCard from "../components/RecipeCard";
import { RecipeBoxObject } from "../models/RecipeBoxObject";
import { DayPlanObject } from "../models/DayPlanObject";
import RecipeBox from "../components/RecipeBox";
import styled from "styled-components";
import theme from "../theme";
import Popup from "reactjs-popup";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { IngredientObject } from "../models/IngredientObject";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
const PopupContent: React.FC<{ onSave: (name: string, quantity: number, unit: string) => void }> = ({ onSave }) => {
  const [tempName, setTempName] = useState('');
  const [tempUnit, setTempUnit] = useState('');
  const [tempQuantity, setTempQuantity] = useState(0);
  const dropdownOptions = [{ name: 'No Unit', value: '' }, { name: 'ounces', value: 'oz' }, { name: 'pounds', value: 'lbs' }, {name: "can", value: 'can'}, {name: "cloves", value: "cloves"}, {name: "teaspoons", value: "tsp"}, {name: "tablespoon", value: "tbsp"}, {name: "packet", value: "packet"}, {name: "bag", value: "bag"}, {name: "cups", value: "cups"}, {name: "slices", value: "slices"}];
  const defaultOption = dropdownOptions[0].name;
  
  const handleTempNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };
  const handleTempQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempQuantity(parseFloat(e.target.value));
  };

  const handleTempUnitChange = (selectedOption: { value: string }) => {
    setTempUnit(selectedOption.value);
  };
  const handleSave = () => {
    if(tempName !== ""){
      onSave(tempName, tempQuantity, tempUnit);
    }
    
    // No need to close the popup here
  };

  return (
    <div className='add-ingredient'>
      <div className='content row'>
        <div className="name-select">
          <p>Enter Name:</p>
          <input
            className="custom-input"
            value={tempName}
            onChange={handleTempNameChange}
          />
        </div>
        <div className="quantity-select">
          <p>Enter Quantity:</p>
          <input
            className="custom-input"
            type="number"
            value={tempQuantity}
            onChange={handleTempQuantityChange}
          />
        </div>
        <div className="unit-select">
          <p>Enter Unit:</p>
          <Dropdown
            className="custom-dropdown"
            options={dropdownOptions.map(option => ({ value: option.value, label: option.name }))}
            value={{ value: tempUnit, label: tempUnit !== '' ? tempUnit : 'No Unit' }}
            onChange={handleTempUnitChange}
          />
        </div>
      </div>

      <div className='close-button'>
        <button onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

const GroceryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("PantryInfo");
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showMoreGroceries, setShowMoreGroceries] = useState(false);
  
  const handleRangeButtonClick = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };
  const handleSaveRangeButtonClick = () => {
    setShowDateRangePicker(!showDateRangePicker);
    fetchMealPlanList();
  };
  interface GroceryTabProps {
    isActive: boolean;
  }
  const GroceryPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px 0;
    font-family: ${theme.fonts.primary};
    text-align: center;
  `;

  const GroceryTabContainer = styled.div`
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

  const GroceryInfo = styled.div`
    width: 50%;
    padding: 20px;
  `;

  const GroceryTab = styled.div<GroceryTabProps>`
    font-family: ${theme.fonts.primary};
    padding: 15px 30px;
    cursor: pointer;
    background-color: ${(props) => (props.isActive ? theme.colors.primary : theme.colors.white)};
    color: ${(props) => (props.isActive ? theme.colors.white : theme.colors.black)};
    border-radius: 25px 25px 0 0;
    box-shadow: ${theme.shadow};
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${theme.hover.background};
      color: ${theme.hover.text};
    }
  `;

  const InfoHeader = styled.h2`
    font-weight: bold;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
  `;
  useEffect(() => {

    // API calls to populate all lists
    const fetchPantryList = async () => {
      try {
        const response = await fetch("http://localhost:9000/users/NWOUQ5rKfzf8fbOHdGapVcH261z1");
        const data = await response.json();
        const userPantry = data.Pantry_Items;
        setIngredient(userPantry);
       // setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPantryList();
    fetchMealPlanList();
    
  }, []);
  const combineDuplicates = (aggregatedList: any[]) => {
    const combinedList: any[] = [];
    
    // Create a map to keep track of quantities for each unique ingredient
    const ingredientMap: { [key: string]: { quantity: number, unit: string } } = {};
    
    // Iterate over each ingredient in the aggregated list
    aggregatedList.forEach((ingredient) => {
      const key = `${ingredient.name.toLowerCase()}_${ingredient.unit}`; // Convert the name to lowercase before creating the key
      
      // If the ingredient already exists in the map, add its quantity to the existing one
      if (ingredientMap[key]) {
        ingredientMap[key].quantity += ingredient.quantity;
      } else {
        // If the ingredient doesn't exist in the map, add it
        ingredientMap[key] = { quantity: ingredient.quantity, unit: ingredient.unit };
      }
    });
    
    // Convert the ingredient map back to an array
    for (const key in ingredientMap) {
      if (Object.prototype.hasOwnProperty.call(ingredientMap, key)) {
        const { quantity, unit } = ingredientMap[key];
        const [name] = key.split('_'); // Split the key to get the name
        combinedList.push({ name, quantity, unit });
      }
    }
    
    return combinedList;
  };
  
  const fetchMealPlanList = async () => {
    try {
      const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get 1-indexed months
      const startDay = startDate.getDate().toString().padStart(2, '0');
      const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get 1-indexed months
      const endDay = endDate.getDate().toString().padStart(2, '0');
      const url = `http://localhost:9000/users/NWOUQ5rKfzf8fbOHdGapVcH261z1/${startMonth}/${startDay}/${startDate.getFullYear()}/${endMonth}/${endDay}/${endDate.getFullYear()}`;
      console.log(url);
      const response = await fetch(url);

      const data = await response.json();

      
      let aggregatedIngredients: any = []; // Array to store aggregated ingredients

    // Iterate over each recipe ID and fetch ingredients
    for (const item of data) {
      const ingredients = await fetchIngredientByID(item.recipe_id);
      aggregatedIngredients = aggregatedIngredients.concat(ingredients); // Concatenate fetched ingredients
    }
    console.log("pre combined: ", aggregatedIngredients);
    aggregatedIngredients = combineDuplicates(aggregatedIngredients);
    setMealPlan(aggregatedIngredients);
    console.log("Final Aggregated Ingredients:", aggregatedIngredients);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchIngredientByID = async (id: number) => {
    console.log("enter fetch ingredient");
    try {
      
      const url = `http://localhost:9000/recipes/${id}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("fetch id:");
      console.log(data);
      let ingredientList: any[] = [];
      for (const key in data.ingredients) {
        if (Object.prototype.hasOwnProperty.call(data.ingredients, key)) {
          // Construct each ingredient object
          const tempIngredient: any = {
            name: data.ingredients[key],
            quantity: data.quantities[key],
            unit: data.units[key]
          };
          ingredientList.push(tempIngredient);
        }
      }
      console.log("ingredient list: " + JSON.stringify(ingredientList));
      return ingredientList;
    } catch (error) {
      console.log(error);
    }
  };
  const deletePantryItemApi = async (tempIngredient:any) => {
    try {
      const response = await fetch(
        `http://localhost:9000/users/remove_pantry/NWOUQ5rKfzf8fbOHdGapVcH261z1`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: tempIngredient.name,
          quantity: tempIngredient.quantity,
          unit: tempIngredient.unit,
        })
      }
      
    )
    console.log("name: " + tempIngredient.name, "quantity: " + tempIngredient.quantity, "unit: " + tempIngredient.unit);
    console.log(response);
  } catch (error) {
      console.log(error);
    }
  };
  const addPantryItemApi = async (tempIngredient:any) => {
    try {
      const response = await fetch(
        `http://localhost:9000/users/add_pantry/NWOUQ5rKfzf8fbOHdGapVcH261z1`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: tempIngredient.name,
          quantity: tempIngredient.quantity,
          unit: tempIngredient.unit,
        })
      }
      
    )
    console.log("name: " + tempIngredient.name, "quantity: " + tempIngredient.quantity, "unit: " + tempIngredient.unit);
    console.log(response);
  } catch (error) {
      console.log(error);
    }
  };
  // insert back end call here to populate original ingredient list
  const [ingredientList, setIngredient] = useState([
    { unit: "", name: "", quantity: 0 },
  ]);
  const [MealPlanList, setMealPlan] = useState([
    { unit: "", name: "", quantity: 0 },
  ]);
  const [GroceryList, setGrocery] = useState([
    { unit: "", name: "", quantity: 0}
  ]);
  const handlePopupSave = (tempName: string, tempQuantity: number, tempUnit: string) => {
    setName(tempName);
    setQuantity(prevQuantity => prevQuantity + tempQuantity);
    setUnit(tempUnit);
    
    let ingredientFound = false;

    addPantryItemApi({name: tempName, quantity: tempQuantity, unit: tempUnit});
    setIngredient(prevIngredientList => {
      const updatedIngredients = prevIngredientList.map(ingredient => {
        if ((ingredient.name).toUpperCase() === (tempName).toUpperCase()) {
          console.log("match found");
          ingredientFound = true;
          deletePantryItemApi({name: ingredient.name, quantity: ingredient.quantity, unit: ingredient.unit})
          addPantryItemApi({name: ingredient.name, quantity: ingredient.quantity + tempQuantity, unit: ingredient.unit})
          return {
            ...ingredient,
            quantity: ingredient.quantity + tempQuantity
          };
        }
        return ingredient;
      });

      if (!ingredientFound) {
        return [
          ...updatedIngredients,
          { name: tempName, quantity: tempQuantity, unit: tempUnit }
        ];
      }

      return updatedIngredients;
    });
  };
  useEffect(() => {
  }, [name, quantity, unit]);
  const todaysDate = new Date();
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };
  const createGroceryList = () => {
    // Creates grocery list by subtracting meal plan list from your pantry
    const pantryIngredientQuantities = new Map(
      ingredientList.map((ingredient) => [ingredient.name.toUpperCase(), ingredient.quantity])
    );

    const newGroceryList = MealPlanList.map((mealPlanIngredient) => {
      const pantryQuantity = pantryIngredientQuantities.get(mealPlanIngredient.name.toUpperCase()) || 0;
      const remainingQuantity = Math.max(0, mealPlanIngredient.quantity - pantryQuantity);

      return {
        name: mealPlanIngredient.name,
        quantity: remainingQuantity,
        unit: mealPlanIngredient.unit,
      };
    }).filter((ingredient) => ingredient.quantity > 0);

    setGrocery(newGroceryList);

  }
  const deletePantryIngredient = (ingredientName: string, ingredientQuantity: number, ingredientUnit: string) => {
    
    deletePantryItemApi({name: ingredientName, quantity: ingredientQuantity, unit: ingredientUnit});
    setIngredient(prevIngredientList =>
      prevIngredientList.filter(ingredient => ingredient.name !== ingredientName)
    );
  }
  const handleRangeSelect = (ranges: any) => {
    
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

  }
  return (
    <GroceryPageContainer>
      <GroceryTabContainer>
        <GroceryTab
          isActive={activeTab === "PantryInfo"}
          onClick={() => {
            setActiveTab("PantryInfo");
            setShowDateRangePicker(false); // Reset state when switching tabs
          }}
        >
          Your Pantry
        </GroceryTab>
        <GroceryTab
          isActive={activeTab === "MealPlan"}
          onClick={() => setActiveTab("MealPlan")}
        >
          Meal Plan
        </GroceryTab>
        <GroceryTab
          isActive={activeTab === "Groceries"}
          onClick={() => {
            setActiveTab("Groceries");
            setShowDateRangePicker(false); // Reset state when switching tabs
            createGroceryList();
          }}
        >
          Groceries
        </GroceryTab>
      </GroceryTabContainer>
      {activeTab === "PantryInfo" && (
        <GroceryInfo>
          <InfoHeader className="header">Ingredients: </InfoHeader>
          <div>
            {ingredientList.map((ingredient, index) => (
              <div key={index} className="IngredientRow">
                <div className="delete-ingredient" onClick={() => deletePantryIngredient(ingredient.name, ingredient.quantity, ingredient.unit)}><p className="minus">-</p></div>
                <div className="Ingredient">
                  {ingredient.name}
                </div>
                <div className="Quantity">
                  {ingredient.quantity} {ingredient.unit !== '""' ? ingredient.unit : null}
                </div>
              </div>
            ))}
          </div>
          <div className="popup">
            <Popup trigger={<p className="add-button">Add Ingredient</p>} modal nested>
              <PopupContent onSave={handlePopupSave} />
            </Popup>
          </div>
        </GroceryInfo>
      )}
      {activeTab === "MealPlan" && (
  <GroceryInfo>
    <div className="range-button">
      {!showDateRangePicker && (
        <button className="date-button" onClick={handleRangeButtonClick}>Edit Date Range</button>
      )}
      {showDateRangePicker && (
        <button className="date-button" onClick={handleSaveRangeButtonClick}>Save Date Range</button>
      )}
    </div>
    {showDateRangePicker && (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleRangeSelect}
      />
    )}
    <InfoHeader className="header">Ingredients: </InfoHeader>
    {MealPlanList.length === 0 && (
      <p className="zero-ingredients">There are currently no ingredients in this date range. Please select a different range.</p>
    )}
    <div>
      {MealPlanList.slice(0, 10).map((ingredient, index) => (
        <div key={index} className="IngredientRow">
          <div className="Ingredient">
            {ingredient.name}
          </div>
          <div className="Quantity">
            {ingredient.quantity} {ingredient.unit !== '""' ? ingredient.unit : null}
          </div>
        </div>
      ))}
    </div>
    {showMoreIngredients && (
      <div>
        {MealPlanList.slice(10).map((ingredient, index) => (
          <div key={index} className="IngredientRow">
            <div className="Ingredient">
              {ingredient.name}
            </div>
            <div className="Quantity">
              {ingredient.quantity} {ingredient.unit !== '""' ? ingredient.unit : null}
            </div>
          </div>
        ))}
        <button className="date-button" onClick={() => setShowMoreIngredients(false)}>Show Less</button>
      </div>
    )}
    {MealPlanList.length > 10 && !showMoreIngredients && (
      <button className="date-button" onClick={() => setShowMoreIngredients(true)}>Show More</button>
    )}
    
  
    <div className="current-range"> <b>Current Date Range:</b> {startDate.toDateString()} - {endDate.toDateString()} </div>
  </GroceryInfo>
)}
      {activeTab === "Groceries" && (
        <GroceryInfo>
          <InfoHeader className="header">Ingredients: </InfoHeader>
          {GroceryList.length === 0 && (
            <p className="zero-ingredients">There are currently no ingredients in this date range. Please select a different range under the meal plan tab.</p>
          )}
          <div>
            {showMoreGroceries ? (
              // Show all ingredients if showMoreGroceries is true
              GroceryList.map((ingredient, index) => (
                <div key={index} className="IngredientRow">
                  <div className="Ingredient">
                    {ingredient.name}
                  </div>
                  <div className="Quantity">
                    {ingredient.quantity} {ingredient.unit !== '""' ? ingredient.unit : null}
                  </div>
                </div>
              ))
            ) : (
              // Show only the first 10 ingredients if showMoreGroceries is false
              GroceryList.slice(0, 10).map((ingredient, index) => (
                <div key={index} className="IngredientRow">
                  <div className="Ingredient">
                    {ingredient.name}
                  </div>
                  <div className="Quantity">
                    {ingredient.quantity} {ingredient.unit !== '""' ? ingredient.unit : null}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Show More / Show Less button */}
          {GroceryList.length > 10 && (
            <button className="date-button" onClick={() => setShowMoreGroceries(!showMoreGroceries)}>
              {showMoreGroceries ? "Show Less" : "Show More"}
            </button>
          )}

        </GroceryInfo>
      )}
    </GroceryPageContainer>
  );
};

export default GroceryPage;
