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
const PopupContent: React.FC<{ onSave: (name: string, amount: number, unit: string) => void }> = ({ onSave }) => {
  const [tempName, setTempName] = useState('');
  const [tempUnit, setTempUnit] = useState('');
  const [tempAmount, setTempAmount] = useState(0);
  const dropdownOptions = [{ name: 'No Unit', value: '' }, { name: 'ounces', value: 'oz' }, { name: 'pounds', value: 'lbs' }];
  const defaultOption = dropdownOptions[0].name;
  
  const handleTempNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };
  const handleTempAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempAmount(parseFloat(e.target.value));
  };

  const handleTempUnitChange = (selectedOption: { value: string }) => {
    setTempUnit(selectedOption.value);
  };
  const handleSave = () => {
    console.log("popup name:", tempName);
    console.log("popup amount:", tempAmount);
    console.log("popup unit:", tempUnit);

    onSave(tempName, tempAmount, tempUnit);
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
        <div className="amount-select">
          <p>Enter Amount:</p>
          <input
            className="custom-input"
            type="number"
            value={tempAmount}
            onChange={handleTempAmountChange}
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
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const handleRangeButtonClick = () => {
    setShowDateRangePicker(!showDateRangePicker);
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

  // insert back end call here to populate original ingredient list
  const [ingredientList, setIngredient] = useState([
    { unit: "oz", name: "Milk", amount: 24 },
    { unit: "", name: "Carrots", amount: 4 },
    { unit: "lbs", name: "Chicken", amount: 1 },
    { unit: "oz", name: "Chicken Broth", amount: 20 },
    { unit: "", name: "Green Onions", amount: 1 },
  ]);
  const [MealPlanList, setMealPlan] = useState([
    { unit: "oz", name: "Milk", amount: 34 },
    { unit: "", name: "Carrots", amount: 2 },
    { unit: "lbs", name: "Beef", amount: 1 },
    { unit: "oz", name: "Honey", amount: 1 },
    { unit: "", name: "Eggs", amount: 3 }
  ]);
  const [GroceryList, setGrocery] = useState([
    { unit: "", name: "", amount: 0}
  ]);
  const handlePopupSave = (tempName: string, tempAmount: number, tempUnit: string) => {
    setName(tempName);
    setAmount(prevAmount => prevAmount + tempAmount);
    setUnit(tempUnit);

    let ingredientFound = false;

    setIngredient(prevIngredientList => {
      const updatedIngredients = prevIngredientList.map(ingredient => {
        if ((ingredient.name).toUpperCase() === (tempName).toUpperCase()) {
          console.log("match found");
          ingredientFound = true;
          return {
            ...ingredient,
            amount: ingredient.amount + tempAmount
          };
        }
        return ingredient;
      });

      if (!ingredientFound) {
        return [
          ...updatedIngredients,
          { name: tempName, amount: tempAmount, unit: tempUnit }
        ];
      }

      return updatedIngredients;
    });
  };
  useEffect(() => {
  }, [name, amount, unit]);
  const todaysDate = new Date();
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };
  const createGroceryList = () => {
    // Creates grocery list by subtracting meal plan list from your pantry
    const pantryIngredientQuantities = new Map(
      ingredientList.map((ingredient) => [ingredient.name.toUpperCase(), ingredient.amount])
    );

    const newGroceryList = MealPlanList.map((mealPlanIngredient) => {
      const pantryQuantity = pantryIngredientQuantities.get(mealPlanIngredient.name.toUpperCase()) || 0;
      const remainingQuantity = Math.max(0, mealPlanIngredient.amount - pantryQuantity);

      return {
        name: mealPlanIngredient.name,
        amount: remainingQuantity,
        unit: mealPlanIngredient.unit,
      };
    }).filter((ingredient) => ingredient.amount > 0);

    setGrocery(newGroceryList);

  }
  const handleRangeSelect = (ranges: any) => {
    console.log(ranges);
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
          <InfoHeader>Ingredients: </InfoHeader>
          <div>
            {ingredientList.map((ingredient, index) => (
              <div key={index} className="IngredientRow">
                <div className="Ingredient">
                  {ingredient.name}
                </div>
                <div className="Quantity">
                  {ingredient.amount} {ingredient.unit}
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
          <InfoHeader>Ingredients: </InfoHeader>
          
          <div>
            {MealPlanList.map((ingredient, index) => (
              <div key={index} className="IngredientRow">
                <div className="Ingredient">
                  {ingredient.name}
                </div>
                <div className="Quantity">
                  {ingredient.amount} {ingredient.unit}
                </div>
              </div>
            ))}
          </div>
          <div className="range-button">
            {!showDateRangePicker && (
              <button className="date-button" onClick={handleRangeButtonClick}>Edit Date Range</button>
            )}
            {showDateRangePicker && (
              <button className="date-button" onClick={handleRangeButtonClick}>Close Range Picker</button>
            )}
          </div>
          {showDateRangePicker && (
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleRangeSelect}
            />
          )}
          <div className="current-range"> <b>Current Date Range:</b> {startDate.toDateString()} - {endDate.toDateString()} </div>
        </GroceryInfo>
      )}
      {activeTab === "Groceries" && (
        <GroceryInfo>
          <InfoHeader>Ingredients: </InfoHeader>
          <div>
            {GroceryList.map((ingredient, index) => (
              <div key={index} className="IngredientRow">
                <div className="Ingredient">
                  {ingredient.name}
                </div>
                <div className="Quantity">
                  {ingredient.amount} {ingredient.unit}
                </div>
              </div>
            ))}
          </div>
        </GroceryInfo>
      )}
    </GroceryPageContainer>
  );
};

export default GroceryPage;
