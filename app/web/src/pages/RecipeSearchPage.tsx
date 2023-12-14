// pages/RecipeSearchPage.tsx

import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";
import RecipeBox from "../components/RecipeBox";

const RecipeSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
`;

const Title = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.title};
  text-align: center;
  font-size: 4rem;
  margin-bottom: 2rem; /* Space between title and search bar */
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 columns
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px; // Adjust the max-width as needed
`;

const RecipeSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // search logic, such as filtering recipes
  };

  return (
    <RecipeSearchContainer>
      <Title>Recipes</Title>
      <SearchBar onSearch={handleSearch} />
      <GridContainer>
        <RecipeBox
          title="Leftover Mashed Potato Bake"
          description="Delicious and easy to make"
          image="/assets/mashed-potatoes.png"
          rating={4.5}
          reviewers="5k"
        />
      </GridContainer>
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;

// // pages/RecipeSearchPage.tsx

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import theme from "../theme";
// import SearchBar from "../components/SearchBar";
// import RecipeBox from "../components/RecipeBox";
// import { db } from "../../../backend/firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from "../../../backend/firebase/firestore";

// const RecipeSearchContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding-top: 5%;
// `;

// const Title = styled.h1`
//   color: ${theme.colors.black};
//   font-family: ${theme.fonts.title};
//   text-align: center;
//   font-size: 4rem;
//   margin-bottom: 2rem; /* Space between title and search bar */
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr); // 4 columns
//   gap: 20px;
//   padding: 20px;
//   width: 100%;
//   max-width: 1200px; // Adjust the max-width as needed
// `;

// const RecipeSearchPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const recipeCollection = collection(db, "recipes");
//       const recipeQuery = searchQuery
//         ? query(recipeCollection, where("title", "==", searchQuery))
//         : recipeCollection;
//       const recipeSnapshot = await getDocs(recipeQuery);
//       const recipeData = recipeSnapshot.docs.map((doc) => doc.data());
//       setRecipes(recipeData);
//     };

//     fetchRecipes();
//   }, [searchQuery]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   return (
//     <RecipeSearchContainer>
//       <Title>Recipes</Title>
//       <SearchBar onSearch={handleSearch} />
//       <GridContainer>
//         {recipes.map((recipe) => (
//           <RecipeBox
//             key={recipe.id}
//             title={recipe.title}
//             description={recipe.description}
//             image={recipe.image}
//             rating={recipe.rating}
//             reviewers={recipe.reviewers}
//           />
//         ))}
//       </GridContainer>
//     </RecipeSearchContainer>
//   );
// };

// export default RecipeSearchPage;
