// SearchBar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../theme";

const SearchBarContainer = styled.div`
  // Changed from nav to div if it's not specifically for navigation
  background: ${theme.colors.white};
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  width: 55%;
  margin: 0 auto;
  position: relative; // Needed for absolute positioning of the search icon
`;

const InputWrapper = styled.div`
  width: 100%; // Take full width of the SearchBarContainer
  position: relative; // Relative position to place the search icon inside it
`;

const Input = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 1rem; // Right padding to make room for the icon
  border: 1px solid ${theme.colors.grey};
  border-radius: 72px;
  font-size: 1rem;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-60%);
  cursor: pointer;

  svg {
    fill: ${theme.colors.grey};
    transition: fill 0.3s ease;
    width: 18px; // Smaller width
    height: 18px; // Smaller height
  }

  &:hover {
    svg {
      fill: ${theme.colors.grey}; // Adjust the color on hover if needed
    }
  }
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
      <InputWrapper>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <SearchIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </SearchIcon>
      </InputWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;
