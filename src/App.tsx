import { Footer } from "./components/layouts/footer/Footer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import "./index.css";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.content}>Content</div>
      <Footer />
    </div>
  );
}

export default App;
