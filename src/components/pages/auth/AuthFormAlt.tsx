import { Link } from "react-router-dom";
import classes from "./AuthFormAlt.module.css";


export const AuthFormAlt = () => {
  return (
    <div className={classes["sign-up"]}>
      <div>Already have an account?</div>
      <Link to="/">Sign in</Link>
    </div>
  );
};
