// pages/RecipeSearchPage.tsx

import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import SearchBar from "../components/SearchBar";

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

const Body = styled.h1`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.primary};
  position: absolute;
  left: 120px;
  top: 65%;
  transform: translateY(-50%); // To center it vertically
  width: calc(100% - 40px);
  text-align: left;
  font-size: 1rem;
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
      {/* Display recipes or search results here */}
    </RecipeSearchContainer>
  );
};

export default RecipeSearchPage;
