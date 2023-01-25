import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, saveLogin } from "../../../store/index";
import { useLoginErrors } from "../../../hooks/useLoginErrors";
import { Button } from "../../ui/Button";
import classes from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, data, status, error }] =
    useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { errors, updateErrors } = useLoginErrors();

  useEffect(() => {
    if (isError) {
      // updateErrors(true, true);
      if (error && "status" in error) {
        if (error.status === 401) {
          setStatusMessage("Error: invalid credentials.");
        } else {
          setStatusMessage("Error: something went wrong.");
        }
      }
    }
    if (data && isSuccess) {
      dispatch(saveLogin(data.token));
      navigate("/");
    }
    console.log(status);
  }, [isError, isLoading, isSuccess, data, dispatch, navigate, status, error]);

  const validateForm = (): void => {
    let { usernameError, passwordError } = { ...errors };
    if (!username || username.length < 4) {
      usernameError = true;
    } else {
      usernameError = false;
    }

    if (!password || password.length < 4) {
      passwordError = true;
    } else {
      passwordError = false;
    }
    updateErrors(usernameError, passwordError);
  };

  const onLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    validateForm();
    if (!errors.passwordError && !errors.usernameError) {
      login({
        username,
        password,
      });
    } else {
      console.log(`form invalid`);
    }
  };

  const onChangeUsername = (value: string) => {
    //todo:maybe validate here?
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    //todo:maybe validate here?
    setPassword(value);
  };

  return (
    <div className={classes.container}>
      <div>
        <h4>
          Welcome <span className="orange">back!</span>
        </h4>
      </div>
      <div>
        Thank you for coming back. Hope you have a good day and inspire others.
      </div>

      <div className={classes["form-wrapper"]}>
        {statusMessage && <div className={classes["response-error"]}>{statusMessage}</div>}
        <form>
          <div className={classes["input-item"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => onChangeUsername(e.target.value)}
              className={errors.usernameError ? classes.error : ""}
            ></input>
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => onChangePassword(e.target.value)}
              className={errors.passwordError ? classes.error : ""}
            ></input>
          </div>
          <div className={classes["input-item"]}>
            <Button
              title="Login"
              type="alternative"
              onClickHandler={(e) => onLogin(e)}
            ></Button>
          </div>
          <div className={classes["sign-up"]}>
            <div>Don't have an account?</div>
            <Link to="/">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
