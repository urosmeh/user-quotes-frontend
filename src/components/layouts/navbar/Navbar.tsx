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
import signupAvatar from "../../../assets/img/uploadAvatar.png";

export const Navbar: React.FC = () => {
  const { token, avatar } = useSelector((state: RootState) => state.authToken);
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
          <Link to="/" className={classes["home-link"]}>
            <h3>
              Quotastic
              <span className={qclasses["quote-vector"]}>
                <Quote />
              </span>
            </h3>
          </Link>
        </div>

        <div className={classes["buttons-container"]}>
          {!token && (
            <>
              {location?.pathname !== "/signup" && (
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Button title="Sign up" type="primary" />
                </Link>
              )}
              {location?.pathname !== "/login" && (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button title="Login" type="alternative" />
                </Link>
              )}
            </>
          )}
          {token && (
            <>
              <Link style={{ textDecoration: "none" }} to="/">
                <Button title="Home" type="alternative" />
              </Link>
              <Link style={{ textDecoration: "none" }} to="/">
                <Button title="Settings" type="alternative" />
              </Link>
              <Link style={{ textDecoration: "none" }} to="/">
                <Button
                  title="Logout"
                  type="alternative"
                  onClickHandler={onLogout}
                />
              </Link>
              <img
                style={{ width: "65px" }}
                src={
                  avatar
                    ? `http://localhost:3000/users/avatar/${avatar}`
                    : signupAvatar
                }
                alt="avatar"
              ></img>
            </>
          )}
        </div>
      </header>
    </>
  );
};
