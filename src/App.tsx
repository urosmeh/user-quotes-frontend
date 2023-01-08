import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/layouts/footer/Footer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import "./index.css";
import classes from "./App.module.css";
import { LandingPage } from "./components/pages/LandingPage";

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login">
            <>Test</>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
