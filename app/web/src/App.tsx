import React from "react";
import logo from "./logo.svg";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";

// Importing BrowserRouter, Routes, and Route components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Other components such as Link or NavLink for navigation links
import { Link, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />;
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
