import React from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipePage from "./pages/RecipePage";

// Importing BrowserRouter, Routes, and Route components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Other components such as Link or NavLink for navigation links
import { Link, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeSearchPage />} />
        <Route path="/recipes" element={<RecipePage />} />
      </Routes>
    </>
  );
}

export default App;
