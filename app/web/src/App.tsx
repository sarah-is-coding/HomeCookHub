import React from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import PlanningPage from "./pages/PlanningPage";
import TutorialsPage from "./pages/TutorialsPage";
import "./loginUser";

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
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route
          path="/meal-planning"
          element={<PlanningPage></PlanningPage>}
        ></Route>
        <Route
          path="/user-profile"
          element={<ProfilePage></ProfilePage>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
