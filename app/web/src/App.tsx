import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import PlanningPage from "./pages/PlanningPage";
import TutorialsPage from "./pages/TutorialsPage";
import AddRecipePage from "./pages/AddRecipe";
import "./loginUser";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import GroceryPage from "./pages/GroceryPage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CommunityPage from "./pages/CommunityPage";
//import CommunityPage from "./pages/CommunityPage";

if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn.bind(console.warn);
  console.warn = (msg) => {
    if (msg.includes("has been created dynamically")) return;
    originalWarn(msg);
  };
}

function App() {
  useEffect(() => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "user@example.com", "password")
      .then((userCredential) => {})
      .catch((error) => {});
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeSearchPage />} />
        <Route path="/recipes/:title" element={<RecipePage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/grocery-list" element={<GroceryPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/meal-planning" element={<PlanningPage />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
