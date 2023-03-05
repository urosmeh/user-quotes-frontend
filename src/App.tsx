import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layouts/footer/Footer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import "./index.css";
import classes from "./App.module.css";
import { LoginPage } from "./components/pages/auth/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { LandingPage } from "./components/pages/landing-page/LandingPage";
import { SignupPage } from "./components/pages/auth/SignupPage";
import { ProfilePage } from "./components/pages/profile/ProfilePage";

function App() {
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.authToken);

  return (
    <div>
      <Navbar />
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>

          <Route
            path="/login"
            element={
              !token ? (
                <LoginPage />
              ) : (
                <Navigate to="/" state={{ from: location }} replace />
              )
            }
          ></Route>
          <Route
            path="/signup"
            element={
              !token ? (
                <SignupPage />
              ) : (
                <Navigate to="/" state={{ from: location }} replace />
              )
            }
          ></Route>
          <Route
            path="users/:userId"
            element={
              token ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
