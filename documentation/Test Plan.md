# Test Plan

## Overall Direction
In our project, we employ a comprehensive testing strategy focused on ensuring both functionality and user experience. Our tests are structured to cover all core features of the website, emphasizing real-world scenarios that our users might encounter. This includes basic functionality like viewing, creating, and editing recipes, as well as more complex interactions such as meal planning and grocery list generation.

We utilize a mix of black box and white box testing techniques to validate both the visible functionality and the underlying code structure. Our functional tests are designed to ensure that each feature operates as expected, while performance tests are conducted to guarantee the application's efficiency and responsiveness. By incorporating both unit and integration tests, we ensure the reliability of individual components and their seamless integration within the larger system.

Overall, our approach is to strike a balance between thoroughness and efficiency, ensuring comprehensive coverage without overcomplicating the process. This testing methodology aims to deliver a robust, user-friendly platform that meets the needs and expectations of our users.

## Test Cases
List a series of 10-25 tests for validating your project outcomes. For each test case provide the following:
1. Test case identifier (a number or unique name)
2. Purpose of test
3. Description of test
4. Inputs used for test
5. Expected outputs/results
6. Normal/Abnormal/Boundary case indication
7. Blackbox/Whitebox test indication
8. Functional/Performance test indication
9. Unit/Integration test indication

Note that some of these categories may be inappropriate for your project and may be omitted if you can justify doing so. For items 6-9, only one term should apply.

### Mary
#### R01 — User can view a recipe
- **Purpose:** This test will ensure that the core functionality of the website is functioning properly in that users can view recipes.
- **Description:** The user will attempt to navigate to a specific recipe.
- **Outputs:** The recipe data shown should match the data of the recipe they meant to navigate to.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R02 — User can create/upload a recipe
- **Purpose:** This test will ensure that the core functionality of the website is functioning properly.
- **Description:** The process of uploading a new recipe will be followed. Then, the firestore database will be checked to ensure that the information was correctly uploaded and matching. Finally, the recipe data will be attempted to be retrieved by the website to ensure that it displays properly.
- **Inputs:** Recipe data entered by the user.
- **Outputs:** The expected results of this test is that the recipe data is correctly added and stored in the firestore database.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R03 — User can edit a recipe
- **Purpose:** This test will ensure that the core functionality of the website is functioning properly and that users can exercise control over recipes they’ve created.
- **Description:** The user will attempt to change details on a recipe that they have created.
- **Inputs:** Changes made to an existing recipe.
- **Outputs:** The expected results of this test is that changes that are saved are reflected in the database and when the recipe is pulled up. Changes that are discarded should not be reflected.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R04 — User can review a recipe
- **Purpose:** This test will ensure that the core functionality of the website is functioning properly in that users can interact with recipes.
- **Description:** The user will attempt to write a review for an existing recipe.
- **Outputs:** The expected results of this test are that the review the user left is accurately added to the recipe and reflected in the recipe card.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R05 — User can not review their own recipe
- **Purpose:** This test will ensure that users can not scam the system by reviewing their own recipes.
- **Description:** The user will attempt to write a review for a recipe they created.
- **Outputs:** The user should be unable to write a review.
- **Normal/Abnormal/Boundary:** Abnormal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R06 — Adding recipe to meal plan
- **Purpose:** This test will ensure that the users meal plan recipes are saved properly in the database.
- **Description:** The user will add a recipe from their saved recipes to a specific date on the calendar. They will have the option to add it to one of three meals on that day.
- **Outputs:** The output will be the day plan object containing the three meals for the associated day in the database.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** White Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R07 — Correct recipes are shown by date on meal plan
- **Purpose:** This test ensures that the user sees the correct recipes in their meal plan.
- **Description:** A day on the calendar is selected by the user and 3 meal cards will be shown for breakfast lunch and dinner. This test will ensure that the date will match with the correct meals.
- **Inputs:** A date selection from the calendar.
- **Outputs:** The expected results of this test is that the correct recipe data is pulled from the firebase storage.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Unit

#### R08 — Correct generation of grocery list
- **Purpose:** This test will ensure that the ingredients required from the recipes added to the meal planner will show up on the user’s grocery list.
- **Description:** The user will be able to see the ingredients they need compared to the ingredients they already have in their pantry.
- **Inputs:** Items currently in their pantry and ingredients required for selected recipes.
- **Outputs:** The resulting list will show the ingredients needed to complete the meal plan for that week.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Integration

#### R09 — User Login/Logout Functionality
- **Purpose:** To verify that users can successfully log in/logout to their accounts.
- **Description:** The user will enter their credentials to log in/logout.
- **Inputs:** User credentials (username and password).
- **Outputs:** Successful access to the user's account.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Unit

#### R10 — User Profile Correctly Displays Personal Information
- **Purpose:** To ensure that the user's profile accurately displays personal information and saved recipes.
- **Description:** The user accesses their profile to verify that personal information and their saved recipes are correctly displayed.
- **Inputs:** Navigation to the user profile.
- **Outputs:** Accurate display of user's personal information and a list of their saved recipes.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional
- **Unit/Integration:** Unit

#### R11 - Correct implementation of Search Filters
- **Purpose:** This test is to ensure that when searching recipes, it pulls up the right recipes that follows the search filters.
- **Description:** When a user searches for a recipe, we need to make sure that the correct recipes pop up on the screen. We need to test this with different search filters to make sure it filters out recipes to show the correct ones on the screen for the user to click on.
- **Inputs:** Search query, and filters
- **Outputs:** The resulting page showing the recipes.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional

#### R12 - Saved Recipes are viewable on User Profile
- **Purpose:** This test to see if the user’s saved recipes are viewable on the user profile.
- **Description:** When we click on the user profile, we need to make sure that it’s shown on the screen.
- **Inputs:** Recipes saved, user
- **Outputs:** Web Page shown with saved recipes.
- **Normal/Abnormal/Boundary:** Normal
- **Blackbox/Whitebox:** Black Box
- **Functional/Performance:** Functional

| Test ID | Normal/Abnormal | Blackbox/Whitebox | Functional/Performance | Unit/Integration |
|---------|-----------------|-------------------|------------------------|------------------|
| R01     | Normal          | Black Box         | Functional             | Integration      |
| R02     | Normal          | Black Box         | Functional             | Integration      |
| R03     | Normal          | Black Box         | Functional             | Integration      |
| R04     | Normal          | Black Box         | Functional             | Integration      |
| R05     | Abnormal        | Black Box         | Functional             | Integration      |
| R06     | Normal          | White Box         | Functional             | Integration      |
| R07     | Normal          | Black Box         | Functional             | Unit             |
| R08     | Normal          | Black Box         | Functional             | Integration      |
| R09     | Normal          | Black Box         | Functional             | Unit             |
| R010    | Normal          | Black Box         | Functional             | Unit             |
| R11     | Normal          | Black Box         | Functional             | Integration      |
| R12     | Normal          | Black Box         | Functional             | Unit             |
