## Starting HomeCookHub
Currently, HomeCookHub is still in development; you will need to run the code locally. To run the app, you will first need to have a copy of the code on your computer. Make sure that all required modules are installed.

To run the application, first navigate to the HomeCookHub\api directory, then run the command `npm start`. This will start the api which allows the application to communicate with the database. Next, in a separate terminal window, navigate to the HomeCookHub\App\Web directory. Run the command `npm start`. You can now go to http:localhost:3000/ to access the web application.

## User Profile
If you are logged in, you can navigate to the user profile in the top right of the screen designated by the person icon. 

![Profile Button](./pictures/user%20profile.PNG)

Once clicked you will be able to see your username and profile picture along with two tabs.

![Profile page with tabs highlighted](./pictures/saved%20recipes.PNG)

You can switch between these two tabs to show profile info or saved recipes. Recipes can be saved from the home page or the recipe search page. Once saved, they will be viewable in your profile page.

## Adding a Recipe 
To add a new recipe to HomeCookHub, navigate to the recipe search page. In the bottom right corner there is a button which allows you to add a recipe:

![Add Recipe Button](./pictures/add%20recipe.PNG)

Press the button to go to a separate page dedicated to recipe creation. On this page, you will be prompted to enter information about your recipe, including the title, ingredients, preparation steps, cooking time, and an image that best represents your dish. 

![Add recipe page partially filled out](./pictures/add%20recipe%20page.PNG)

Once you've filled in all the required fields, you can submit your recipe by clicking the "Add Recipe" button at the bottom of the page.

![Add recipe button](./pictures/add%20recipe%20button.PNG)

This will upload your recipe to the HomeCookHub database, making it searchable and savable by other users.

## Interacting with Meal Plans
The meal planning tab is where you will be able to set the recipes you plan on making to specific dates on the calendar. Once you select a date on the calendar, you will be able to see 3 slots for recipe cards tied to that date. 

![Meal plan page with calendar date and add recipe button highlighted](./pictures/meal%20plan.PNG)

You can also add new recipes to the meal plan by pressing the "Add Recipe Button" which will bring up a new pop up.

![Add meal plan entry pop up window](./pictures/add%20recipe%20meal%20plan.PNG)

Use this pop up to select a recipe and a meal and then press the "Save" button to add it to the meal plan for the currently selected day. Once added to your meal plan it will also update your grocery list.

## Searching for a recipe
Clicking on the recipes tab at the top will take you to the recipe page. There you will find a search bar. Type in your search in the search bar and a list of 20 recipes will show up on the page. The recipes are in order from closest to farthest from what you are searching.

![Search results for query "Bread"](./pictures/save%20recipe.PNG)

You can also save recipes to your profile from the search page by pressing the red plus button:

![recipe card with save recipe button highlighted](./pictures/recipe%20card.PNG)

## Interacting with Individual Recipes 
When you find a recipe you're interested in on HomeCookHub, clicking on the recipe will take you to a detailed recipe page. This page showcases the recipe's title, an image, and a star rating system, allowing you to quickly see how others have rated the recipe. Below the image, you'll find a detailed description, the list of ingredients, and the cooking instructions.

![recipe page with star rating and "jump to recipe" button highlighted](./pictures/recipe%20page.PNG)

Each recipe page also includes interactive elements to enhance your cooking experience:

Star Rating: Users can rate the recipe based on their experience. Hover over and click the stars to leave your rating.

Jump to Recipe Button: If you're interested in getting straight to the cooking details, this button scrolls the page down to the recipe card, which outlines the ingredients and steps.


## How to generate grocery list
Your grocery list takes in what you already have in your pantry and cross checks that with the ingredients needed for the meals that you have planned for the week. This will tell you what you need to buy when you go to the store. You can view and manage items in your pantry in the "Your Pantry" tab of the grocery list page:

![The "Your Pantry" tab with the "Add Ingredient" and remove ingredient buttons highlighted](./pictures/pantry%20items%201.PNG)

Items can be removed by pressing the minus buttons next to each item. To add an item, click the "Add Item" button. This will bring up a pop up which will prompt you for the item's name, quantity, and unit.

![The add ingredient pop up filled out with 12 eggs and the save button highlighted](./pictures/add%20pantry item%20pop%20up.PNG)

Press the "Save" button to add it your pantry.

![The updated pantry item list with Eggs highlighted at the bottom](./pictures/pantry%20items%202.PNG)

The "Meal Plan" tab shows the ingredients needed for the meals on your meal plan for the selected date range.

![The Meal Plan tab with the "Edit Date Range" button highlighted](./pictures/meal%20plan%20control.PNG)

The date range can be controled by clicking the "Edit Date Range" button and selecting a date range with the mouse:

![The calendar control for selecting a date range](./pictures/meal%20plan%20range%20control.PNG)

The final tab is the Grocery List tab which will take the items required for your meal plan and remove any items you already have in your pantry:

![The grocery list](./pictures/grocery%20list.PNG)

