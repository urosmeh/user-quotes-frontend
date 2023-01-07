import React from "react";
import classes from "./Navbar.module.css";
import qclasses from "./QuoteSvg.module.css";
import { ReactComponent as Quote } from "../../../assets/quote.svg";
import { Button } from "../../ui/Button";

export const Navbar: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <div>
          <h3>
            Quotastic
            <span className={qclasses["quote-vector"]}>
              <Quote />
            </span>
          </h3>
        </div>

        <Button
          title="Login"
          type="primary"
          onClickHandler={() => console.log("1test")}
        />
      </header>
    </>
  );
};
