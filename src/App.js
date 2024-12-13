import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ProfilePage from "./pages/Profile/ProfilePage"; // Example profile page
import FeedPage from "./pages/Feed/FeedPage"; // Example feed page
import NotFoundPage from "./pages/NotFound"; // 404 Page
import { AuthContextProvider } from "./context/AuthContext"; // Provide auth context to app

const App = () => {
  return (
    <AuthContextProvider>
      {" "}
      {/* Wrap your app with the auth context provider */}
      <Router>
        <Routes>
          {" "}
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<LoginPage />} /> {/* Home page or login */}
          <Route path="/profile" element={<ProfilePage />} />{" "}
          {/* Profile page */}
          <Route path="/feed" element={<FeedPage />} /> {/* Feed page */}
          <Route path="*" element={<NotFoundPage />} /> {/* 404 page */}
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
