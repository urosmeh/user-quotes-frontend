import React from "react";
import classes from "./Navbar.module.css";
import qclasses from "./QuoteSvg.module.css";
import { ReactComponent as Quote } from "../../../assets/quote.svg";
import { Button } from "../../ui/Button";
import { Link, redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { saveLogout } from "../../../store/index";

export const Navbar: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.authToken);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(saveLogout());
    redirect("/");
  };
  const location = useLocation();

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

        <div className={classes["buttons-container"]}>
          {!token && (
            <>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button
                  title="Sign up"
                  type="primary"
                />
              </Link>
              {location?.pathname !== "/login" && (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button
                    title="Login"
                    type="alternative"
                  />
                </Link>
              )}
            </>
          )}
          {token && (
            <Link style={{ textDecoration: "none" }} to="/">
              <Button
                title="Logout"
                type="alternative"
                onClickHandler={onLogout}
              />
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
