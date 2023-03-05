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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../ui/Modal/Modal";
import useModal from "../../../hooks/useModal";
import { EditQuote } from "../../modals/EditQuote";

export const Navbar: React.FC = () => {
  const { token, avatar, userId } = useSelector(
    (state: RootState) => state.authToken
  );

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(saveLogout());
    redirect("/");
  };
  const location = useLocation();
  const { isOpen, toggle } = useModal();

  return (
    <div
      className={
        location.pathname.indexOf("users") >= 0 ? classes.orangebg : ""
      }
    >
      <Modal isOpen={isOpen} toggle={toggle}>
        <EditQuote closeModal={toggle} />
      </Modal>
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
              <Link style={{ textDecoration: "none" }} to={`/users/${userId}`}>
                <img
                  src={
                    avatar
                      ? `http://localhost:3000/users/avatar/${avatar}`
                      : signupAvatar
                  }
                  style={{ width: "65px" }}
                  alt="avatar"
                ></img>
              </Link>
              <FontAwesomeIcon
                cursor="pointer"
                className={
                  location.pathname.indexOf("users") >= 0 ? "" : "orange"
                }
                icon={faPlus}
                onClick={toggle}
              />
            </>
          )}
        </div>
      </header>
    </div>
  );
};
