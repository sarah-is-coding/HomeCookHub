// Navbar.tsx
import React from "react";
import styled from "styled-components";
// import { NavLink } from 'react-router-dom'; // Uncomment when you install react-router-dom
import theme from "./theme";

const NavbarContainer = styled.nav`
  background: ${theme.colors.white};
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
`;

const NavLogo = styled.a`
  color: ${theme.colors.black};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none; // hides the nav items on smaller screens
  }
`;

const NavItem = styled.a`
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.black};
  text-decoration: none;
  margin: 0 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.light}; // Use a highlight color on hover
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    fill: ${theme.colors.black};
    transition: fill 0.3s ease;
    width: 30px;
    height: 30px;
  }

  &:hover {
    svg {
      fill: ${theme.colors.black};
    }
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      {/* Logo will link to the home page */}
      <NavLogo href="/">
        <img
          src="./logo.svg"
          alt="Company Logo"
          style={{ marginRight: "10px", width: "190px", height: "auto" }}
        />
      </NavLogo>
      {/* Navigation items */}
      <NavItems>
        <NavItem href="/recipes">Recipes</NavItem>
        <NavItem href="/meal-planning">Meal Planning</NavItem>
        <NavItem href="/grocery-list">Grocery List</NavItem>
        <NavItem href="/tutorials">Tutorials</NavItem>
        <NavItem href="/community">Community</NavItem>
      </NavItems>
      {/* Mobile menu icon for smaller screens */}
      <MobileMenuIcon>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </MobileMenuIcon>
      {/* User profile icon */}
      <UserIcon>
        {/* Link to the user profile */}
        <NavItem href="/user-profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
          </svg>
        </NavItem>
      </UserIcon>
    </NavbarContainer>
  );
};

export default Navbar;
