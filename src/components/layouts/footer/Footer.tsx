import React from "react";
import classes from "./Footer.module.css";
import quote from "../../../assets/img/quotes.png";

export const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-content"]}>
        <span className={classes["footer-logo"]}>
          <img src={quote} alt="quote" />
        </span>
        <span>All rights reserved | skillupmentor.com</span>
      </div>
    </footer>
  );
};
