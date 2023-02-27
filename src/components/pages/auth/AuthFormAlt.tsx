import { Link } from "react-router-dom";
import classes from "./AuthFormAlt.module.css";

export type AuthFormAltProps = {
  text: string;
  path: string;
  linkText: string;
};

export const AuthFormAlt = ({ text, path, linkText }: AuthFormAltProps) => {
  return (
    <div className={classes.signup}>
      <div>{text}</div>
      <Link to={path}>{linkText}</Link>
    </div>
  );
};
