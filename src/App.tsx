import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layouts/footer/Footer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import "./index.css";
import classes from "./App.module.css";
import { LoginPage } from "./components/pages/login-page/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { LandingPage } from "./components/pages/landing-page/LandingPage";

function App() {
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.authToken);

  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.content}>
        <Routes>
          <Route
            path="/login"
            element={
              !token ? (
                <LoginPage />
              ) : (
                <Navigate to="/" state={{ from: location }} replace />

                //todo: CREATE COMPONENT (PROTECTED) <Navigate //component to="/" state={{ from: location }} replace />
              )
            }
          ></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
