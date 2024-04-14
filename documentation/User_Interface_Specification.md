# User Interface Specification

## Theme Configuration

The UI design of the project leverages a centralized theme defined in `theme.ts` to ensure consistent styling across components.

### Fonts
- **Primary**: 'DM Sans', sans-serif
- **Title**: 'Playfair Display', serif

### Colors
- **Base Colors**: White, Black, Light Grey, Grey
- **Primary Palette**: Primary, Light, Accent, Accent Light
- **Interactive States**: Hover background and text colors

### Effects
- **Shadow**: Generic shadow for floating elements

## RecipePage Component

The `RecipePage` is designed to display detailed information about a specific recipe, which users can access by navigating from other parts of the application or directly via a URL.

### Components
- **PageContainer**: Provides a structured container for the page content with defined padding and maximum width for optimal readability.
- **ImageDisplay**: Displays the recipe image prominently with additional interactive elements overlaid for user engagement.
- **ImageOverlay**: A semi-transparent overlay that improves the visibility of text and icons overlaid on the image.
- **TitleOnImage**: Displays the recipe's title directly on the image, enhancing the visual appeal.
- **StarRating**: Allows users to view the recipe's rating through visual star icons, with the number of active stars representing the recipe's average rating.
- **JumpToRecipeButton**: A button that, when clicked, scrolls the user directly to the detailed recipe card further down the page.

### Interactions
- **Image Loading**: Integrates with `FirebaseImage` to load and display recipe images from a Firebase storage path, providing error handling for missing images.
- **Star Interaction**: Users can visually see the recipe rating but cannot interact directly with the stars (view-only).
- **Smooth Scroll**: The jump-to-recipe button uses smooth scrolling to bring the detailed recipe into view, enhancing user experience by avoiding abrupt page jumps.

### Data Handling
- **Dynamic Data Fetching**: Fetches recipe details dynamically based on the URL parameter, ensuring that the page reflects the most current data available from the backend.
- **Error Handling**: Implements robust error handling to manage scenarios where recipe data might be unavailable or the fetch operation fails.

### Styling
- Styled components are used extensively to maintain consistency with the application's theme while allowing for flexibility in component-specific styling needs.

## Element-Specific Styles
- **StarRating and JumpToRecipeButton**: These elements are styled to stand out over the image, ensuring they are easily noticeable and accessible against potentially complex image backgrounds.
- **BlogDescription and CommentsSection**: Styled to provide clear, readable content areas that separate textual information from interactive elements effectively.

### Functionality Details
- **Recipe Data Display**: Showcases detailed information about the recipe, including ingredients, preparation steps, and cooking times.
- **Comments Section**: Reserved space for future integration of user comments, allowing for user interaction and engagement directly on the recipe page.

This specification provides a comprehensive overview of the `RecipePage`, detailing its role in displaying individual recipes within the application. It covers the layout, interactions, data management, and styling that facilitate a detailed and user-friendly viewing experience.

## Profile Page Component Structure

The `ProfilePage` component is a React component styled with `styled-components` and makes use of the theme for dynamic styling based on the application's state and properties.

### Major Components
- **ProfilePageContainer**: Main container that organizes the layout vertically.
- **ProfileHeader**: Displays the user's profile picture and name.
- **ProfileTabContainer**: Houses navigation tabs like 'Profile Info' and 'Saved Recipes'.
- **GridContainer**: Arranges recipe cards in a grid layout in the 'Saved Recipes' tab.

### Profile Page Tabs
- **Profile Info Tab**: Shows basic user information such as name and email.
- **Saved Recipes Tab**: Displays cards for each recipe saved by the user.

### Interactivity
- **Tab Selection**: Allows switching between different sections of the profile page.
- **Recipe Interaction**: Users can view details of saved recipes.

### Data Handling
- **User Authentication**: Checks for user login status and fetches user data accordingly.
- **Recipe Data Fetching**: Retrieves and displays recipes saved by the user.

### Responsiveness
- The layout adjusts to accommodate various device sizes, ensuring usability across desktop and mobile devices.

This specification outlines the structure and functional aspects of the `ProfilePage` without delving into the specific styling details, focusing on component roles and interactions within the application.

## HomePage Component

The `HomePage` serves as the landing page of the application, providing users with a welcoming and visually appealing introduction to the features and services offered.

### Components
- **HomeContainer**: Serves as the root container for the home page.
- **ImageContainer**: Displays a large background image that sets the thematic tone for the user experience.
- **Title**: A prominently displayed title that introduces the site's main purpose.
- **Body**: Provides a brief description of what users can expect from the application.

### Interactions
- **Data Fetching**: The component fetches a list of recipes on initial load to display in the `OurFavoritesSection`.

## OurFavoritesSection Component

This component showcases a selection of favorite recipes, highlighting the application's recipe management capabilities.

### Structure
- **Section**: Styled section that organizes content within the page.
- **FeaturedRecipe**: Displays a single featured recipe in greater detail.
- **SmallRecipesContainer**: Houses additional recipes in a smaller format for quick browsing.

### Recipe Display
- Recipes are displayed using the `RecipeBox` component, which is styled to fit the theme of the site.
- The first recipe is featured prominently, with up to two additional recipes displayed alongside in smaller boxes.

### Styling
- **Section**: Utilizes grid layout for responsive arrangement of recipes.
- **FeaturedRecipe and SmallRecipesContainer**: Use shadows and border-radius for a subtle, elevated effect.

### Functionality
- **Dynamic Recipe Loading**: Recipes passed to the component are dynamically loaded into the layout.
- **Interaction Effects**: Hover effects on recipe boxes enhance user interaction by providing visual feedback.

### Data Handling
- **Props**: Receives an array of recipe objects that it displays. Each recipe object includes details such as title, description, image URL, rating, and cook time.

## Overall Theme and Style

The theme and styling across these components are consistent with the application's color palette and typography settings defined in the `theme.ts` file, ensuring a cohesive user experience.

## RecipeSearchPage Component

The `RecipeSearchPage` is a dedicated component for searching and displaying recipes. It includes a search functionality that dynamically updates the displayed recipes based on the search criteria.

### Components
- **RecipeSearchContainer**: The main container that organizes the layout for the search and display of recipes.
- **Title**: Displays the title of the page, "Recipes", in a prominent style.
- **AddRecipeButton**: A fixed position button that allows users to navigate to a form for adding new recipes.
- **SearchBar**: A component that accepts user input for search queries.
- **GridContainer**: A grid layout that displays recipes in individual `RecipeBox` components.

### Interactions
- **Search Functionality**: Users can type search queries into the `SearchBar`, which triggers the filtering of recipes based on their similarity to the search term.
- **Add Recipe Navigation**: The `AddRecipeButton` serves as a link to the recipe addition page, facilitating easy navigation.

### Data Handling
- **Initial Data Fetch**: On component mount, it fetches recipe data from a server.
- **Dynamic Search Results**: The search results are dynamically updated based on the search term's relevance to recipe titles.

### Recipe Display
- Each recipe is displayed using the `RecipeBox` component, which shows detailed information such as the title, description, image, and ratings.
- The layout adjusts dynamically based on the number of search results, maintaining a clean and organized display even with varying content volumes.

### Styling
- The search page uses a minimalist design with a focus on functionality and ease of use. Recipes are clearly presented, making it easy for users to find and select recipes of interest.

## Overall Theme and Style

This component, like others in the application, adheres to the defined `theme.ts` settings, ensuring that the appearance remains consistent with the rest of the application's aesthetic. The use of styled components allows for modular and maintainable code, with style rules directly linked to the logic of the application.

## PlanningPage Component

The `PlanningPage` serves as a comprehensive interface where users can plan and organize their meals using a calendar layout. It integrates recipe selection through a modal popup, allowing users to conveniently set meals for different days.

### Components
- **MealPlanning**: Main container that includes all the elements related to meal planning.
- **CalendarContainer**: Hosts the `Calendar` component for date selection.
- **CardsContainer**: Displays selected meals for the day as cards in a horizontal layout.
- **MealCard**: Represents individual meals (Breakfast, Lunch, Dinner) with details pulled from selected recipes.
- **PopupContent**: Modal content that allows users to select recipes to add to their meal plan.

### Interactions
- **Date Selection**: Users can select a date on the calendar to view or plan meals for that day.
- **Recipe Selection**: Clicking the 'Add Recipe' button opens a modal allowing users to browse and select recipes to add to the meal plan for a selected meal type (Breakfast, Lunch, Dinner).
- **Meal Planning**: On selecting a recipe, it gets assigned to the chosen meal type for the selected day.

### Data Handling
- **Dynamic Recipe Loading**: Recipes are fetched based on user interactions and selected dates.
- **Meal Plan Management**: Users can view, add, or modify meal plans based on the calendar selection.

### Styling
- This page utilizes styled components for a coherent visual theme, matching the rest of the application. Interactive elements like the calendar and modal popup are styled to provide a seamless user experience.

## Global Style
- The global style for the `PlanningPage` ensures that visual elements like the calendar and popup conform to the application's design language, using colors, fonts, and other styles from the theme.

### Calendar Styling
- **Calendar**: Customized to align with the aesthetic of the application, featuring styled navigation buttons and highlighted dates.

### Popup Styling
- **Popup Modal**: Styled for clarity and accessibility, the popup allows easy navigation between recipe pages and selection of meal types.

### Meal Cards
- **Meal Cards**: Visually distinct cards display the selected recipes for each meal, offering essential information like the recipe title, image, and basic details.

## Functionality Details
- **Recipe Pagination in Popup**: Allows browsing through saved recipes in manageable chunks, enhancing the user experience.
- **Meal Plan Updates**: Integration with backend services to fetch and update meal plans dynamically based on user interaction with the calendar.

This specification provides a comprehensive overview of the `PlanningPage`, highlighting its role in meal planning within the application. It details the interactions, data management, and styling that facilitate an intuitive and efficient user experience.

## GroceryPage Component

The `GroceryPage` provides functionality for users to manage groceries, incorporating elements such as a pantry inventory, meal plan ingredients, and a generated grocery list based on user needs.

### Components
- **GroceryPageContainer**: Main container that organizes the layout for the grocery management interface.
- **GroceryTabContainer**: Houses tabs for switching between pantry, meal plan, and grocery list views.
- **GroceryInfo**: Displays detailed information and interactions for the selected tab.
- **PopupContent**: Modal for adding new ingredients to the pantry.

### Interactions
- **Tab Selection**: Users can switch between viewing pantry items, meal plan details, and grocery lists.
- **Ingredient Management**: Users can add new ingredients to the pantry or delete them as needed through interactive elements within the pantry view.
- **Meal Plan Adjustment**: Users can specify a date range to view meal plan ingredients and generate grocery lists accordingly.

### Data Handling
- **Dynamic Ingredient Loading**: Ingredients for pantry, meal plans, and grocery lists are fetched and updated based on user interactions and selections.
- **Grocery List Generation**: Automatically compiles a grocery list based on the difference between meal plan needs and existing pantry items.

### Styling
- Styled with a clear, user-friendly interface that aligns with the overall application theme, ensuring consistency and ease of navigation.

## Global and Element-Specific Styles
- **Global Style**: Applies foundational styles across all elements within the page, ensuring a consistent look and feel.
- **Dynamic Styling**: Elements such as buttons and input fields have interactive styles that respond to user actions, enhancing the user experience.

### Functionality Details
- **Ingredient Addition and Deletion**: Users can manage pantry ingredients through a popup modal, with immediate updates reflected in the pantry list.
- **Date Range Selection for Meal Plans**: Users can select specific date ranges to view or adjust meal plans, with corresponding updates to the grocery list based on these selections.

This specification outlines the functional aspects and user interactions of the `GroceryPage`, detailing how users can effectively manage their grocery planning within the application.
