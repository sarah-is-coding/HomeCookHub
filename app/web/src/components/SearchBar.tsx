// SearchBar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../theme";

const SearchBarContainer = styled.nav`
  background: ${theme.colors.white};
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
`;

const SearchBar: React.FC = () => {
  return <SearchBarContainer></SearchBarContainer>;
};

export default SearchBar;
