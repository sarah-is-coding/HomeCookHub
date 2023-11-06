// SearchBar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../theme";

const SearchBarContainer = styled.nav`
  background: ${theme.colors.white};
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center; /* Changed from space-between to center */
  padding: 1rem 2rem;
  align-items: center;
  width: 55%;
  margin: 0 auto; /* This will center the container itself if it's not full width */
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${theme.colors.grey};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%; /* Make the input take the full width of its parent */
  display: block; /* This can help if there are other inline elements inside the container */
`;

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        placeholder="Search "
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* Add other navigation or UI elements here */}
    </SearchBarContainer>
  );
};

export default SearchBar;
