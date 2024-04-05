# API Guide
Currently the api is run locally on localhost 9000. All urls should be proceeded with "http://localhost:9000/"

## Recipes
### recipes/
 - **Purpose**: This GET request retrieves all recipes

### recipes/[ID]
 - **Purpose**: This GET request retrieves recipes for an inputted id
 - **Inputs**:
   - **ID**: The string ID of recipe to retrieve

### recipes/add_recipe
 - **Purpose**: This POST request adds a new recipe to the database.
 - **Body**:
   - **title**: The title of the recipe.
   - **author**: The username of the user who uploaded the recipe.
   - **serving_size**: The number of servings in the recipe. This must be a number.
   - **cook_time**: The cook time of the recipe. This must be a number.
   - **prep_time**: The prep time of the recipe. This must be a number.
   - **ingredients**: The list of ingredients. This must a string formatted in JSON format. Ex:
   `{
    '1': 'Ingredient1',
    '2': 'Ingredient2',
    ...
   }`
    - **quantities**: The list of quantities for each ingredient. The order of the quantities must match the order of the ingredients. This must be a string in JSON fromat similar to the ingredients input. Additionally, the quantities must be numbers. Ex:
  `{
    '1': 0.5,
    '2': 1,
    ...
  }`
   - **units**: The list of units for each ingredient and quantity. This should be formatted similarly to the ingredients and quantities inputs. The order should match the order of the ingredients and quantities. Ex:
   `{
      '1': 'tsp',
      '2': 'lb,
      ...
    }`
   - **steps**: The list of steps for the recipe. This must be formatted similarly to the ingrediets, units, and quantities. Ex:
  `{
    '1': 'This is the first step.',
    '2': 'This is the second step.',
    ...
  }`
   - **tags**: The tags associated with the recipe. This must be in the form of a string formatted as an array. Ex: `"['gluten free', 'vegetarian']"`.

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

### users/remove_meal/
 - **Purpose**: This DELETE request deletes a recipe from the user's meal plan.
 - **Body**:
   - **username**: The username of the desired user. Note that this is case sensitive.
   - **month**: The month of the date to remove the recipe from. This must be given in two digits, eg 08.
   - **day**: The day of the date to remove the recipe from. This must be given in two digits, eg 08.
   - **year**: The year of the date to remove the recipe from. This must be given in full form, e.g. 2024 not 24.
   - **recipe_id**: The recipe idea of the recipe to remove.
   - **meal**: The meal (Breakfast, Lunch, or Dinner) of the recipe to be removed.

### users/save_recipe/[USERNAME]
 - **Purpose**: This PUT request adds a saved recipe to the user.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **recipe_id**: The id of the recipe.
   - **title**: The title of the recipe.
   - **imageURL**: The image url of the recipe.

### users/remove_recipe/:username
 - **Purpose**: This PUT request removes a recipe from the user's saved recipes.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **recipe_id**: The id of the recipe.
   - **title**: The title of the recipe.
   - **saved_sec**: (Number) The number of seconds in the saved_date timestamp.
   - **saved_nanosec**: (Number) The number of nanoseconds in the saved_date timestamp.
   - **imageURL**: The image url of the recipe.
 - NOTE: All values must be exact matches or else the saved recipe will not be removed.

### users/save_meal/[USERNAME]
 - **Purpose**: This POST request adds a recipe to the user's meal plan.
 - **Inputs**:
   - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **day**: The day the recipe is saved to. This should be in the form of a string of the format "YYYY/MM/DD".
   - **meal**: The meal the recipe is scheduled for. Should be "Breakfast", "Lunch", or "Dinner".
   - **recipe_id**: The id of the recipe.
   - **title**: The title of the recipe.
   
### users/add_grocery/[USERNAME]
 - **Purpose**: This PUT request adds an item to the user's grocery list.
 - **Inputs**:
    - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **name**: The name of the item to add.
   - **quantity**: (Number) The quantity of the item to add.
   - **unit**: The unit of the item to add.

### users/remove_grocery/[USERNAME]
 - **Purpose**: This PUT request removes an item to the user's grocery list.
 - **Inputs**:
    - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **name**: The name of the item to remove.
   - **quantity**: (Number) The quantity of the item to remove.
   - **unit**: The unit of the item to remove.
- NOTE: All fields must be an exact match or else the item will not be removed from the grocery list.

### users/add_pantry/[USERNAME]
 - **Purpose**: This PUT request adds an item to the user's pantry items.
 - **Inputs**:
    - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **name**: The name of the item to add.
   - **quantity**: (Number) The quantity of the item to add.
   - **unit**: The unit of the item to add.

### users/remove_grocery/[USERNAME]
 - **Purpose**: This PUT request removes an item to the user's pantry items.
 - **Inputs**:
    - **USERNAME**: The username of the desired user. Note that this is case sensitive.
 - **BODY**: The following inputs are required to be included in the request body.
   - **name**: The name of the item to remove.
   - **quantity**: (Number) The quantity of the item to remove.
   - **unit**: The unit of the item to remove.
- NOTE: All fields must be an exact match or else the item will not be removed from the pantry items.