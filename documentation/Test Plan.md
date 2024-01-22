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


