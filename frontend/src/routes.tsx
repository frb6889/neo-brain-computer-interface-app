import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrainingPage from "./pages/TrainingPage";
import UserPage from "./pages/UserPage";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </HashRouter>
  );
}
