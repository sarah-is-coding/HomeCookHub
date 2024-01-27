import React from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";

// Importing HashRouter, Routes, and Route components from react-router-dom
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeSearchPage />} />
        <Route path="/recipes/:title" element={<RecipePage />} />
        <Route path="/user-profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
