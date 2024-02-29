# API Guide
Currently the api is run locally on localhost 9000. All urls should be proceeded with "http://localhost:9000/"

## Recipes
### recipes/
 - **Purpose**: This GET request retrieves all recipes

### recipes/[ID]
 - **Purpose**: This GET request retrieves recipes for an inputted id
 - **Inputs**:
   - **ID**: The string ID of recipe to retrieve

## Users

### users/[USERNAME]
 - **Purpose**: This GET request retrieves all information for a given user including saved recipes, username, email address, and pantry items.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.

### users/[USERNAME]/[MM]/[DD]/[YYYY]
 - **Purpose**: This GET request retrieves all recipes saved to the user's mealplan for the given date.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
   - **MM**: The month of the desired date. This must be given in two digits, e.g. 08.
   - **DD**: The day of the desired date. This must be given in two digits, e.g 08.
   - **YYYY**:The year of the desired date. This must be in full form, e.g 2024 not 24

### users/[USERNAME]/[M1]/[D1]/[Y1]/[M2]/[D2]/[Y2]
 - **Purpose**: This GET request retrieves all recipes saved to the user's mealplan in the given date range.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
   - **M1**: The month of the start date for the range. This must be given in two digits, e.g. 08.
   - **D1**: The day of the start date for the range. This must be given in two digits, e.g 08.
   - **Y1**: The year of the start date for the range. This must be in full form, e.g 2024 not 24.
   - **M2**: The month of the end date for the range. This must be given in two digits, e.g. 08.
   - **D2**: The day of the end date for the range. This must be given in two digits, e.g 08.
   - **Y2**: The year of the end date for the range. This must be in full form, e.g 2024 not 24.

### users/save_recipe/[USERNAME]
 - **Purpose**: This PUT request adds a saved recipe to the user.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **cook_time**: (Number) The cook time of the recipe.
   - **prep_time**: (Number) The prep time for the recipe.
   - **recipe_id**: The id of the recipe.
   - **recipe_title**: The title of the recipe.
   - **serving_size**: (Number) The number of servings the recipe yields.
  
### users/save_meal/[USERNAME]
 - **Purpose**: This POST request adds a recipe to the user's meal plan.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **cook_time**: (Number) The cook time of the recipe.
   - **day**: The day the recipe is saved to. This should be in the form of a string of the format "YYYY/MM/DD".
   - **meal**: The meal the recipe is scheduled for. Should be "Breakfast", "Lunch", or "Dinner".
   - **prep_time**: (Number) The prep time for the recipe.
   - **recipe_id**: The id of the recipe.
   - **recipe_title**: The title of the recipe.
   - **serving_size**: (Number) The number of servings the recipe yields.
   