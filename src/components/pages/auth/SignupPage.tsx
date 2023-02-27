import { AuthHeader } from "../../ui/AuthHeader";
import classes from "./SignupPage.module.css";
import signupAvatar from "../../../assets/img/uploadAvatar.png";
import { Button } from "../../ui/Button";
import { AuthFormAlt } from "./AuthFormAlt";
import { useLoginMutation, useSignupMutation, saveLogin } from "../../../store";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputItem } from "../../ui/InputItem";
import { useLoginErrors } from "../../../hooks/useLoginErrors";

export const SignupPage = () => {
  const [signup, { isSuccess }] = useSignupMutation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { errors, updateErrors } = useLoginErrors();

  const onChangeUsername = (value: string) => {
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeConfPassword = (value: string) => {
    setConfPassword(value);
  };

  const validateForm = () => {
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

    if (password !== confPassword) {
      setStatusMessage("Error: Check confirmed password!");
    }
  };

  const handleSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    validateForm();

    if (
      !errors.passwordError &&
      !errors.usernameError &&
      password === confPassword
    ) {
      try {
        const res = await signup({ username, password }).unwrap();
        console.log(res);
        if (res.username) {
          const { token, id } = await login({ username, password }).unwrap();
          dispatch(saveLogin({ token, id }));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("test");
    }
  };

  // const handleLogin = () => {
  //   login({ username, password });
  // };

  // useEffect(() => {
  //   if (isSuccess === true) {
  //     handleLogin();
  //   }
  // }, [isSuccess, handleLogin]);

  return (
    <div className={classes.content}>
      <div className={classes["form-wrapper"]}>
        <AuthHeader
          header="What is your name?"
          subtitle="Your name will appear on quotes and your public profile."
        />
        <img alt="signup-avatar" src={signupAvatar}></img>
        {statusMessage && (
          <p className={classes["response-error"]}>{statusMessage}</p>
        )}
        <form>
          <InputItem
            label="Email"
            labelFor="email"
            type="text"
            id="email"
            onChangeHandler={onChangeUsername}
            value={username}
            error={errors.usernameError ? "This field is required" : ""}
          />
          <InputItem
            label="Password"
            labelFor="password"
            type="password"
            id="password"
            onChangeHandler={onChangePassword}
            value={password}
            error={errors.passwordError ? "This field is required" : ""}
          />
          <InputItem
            label="Confirm password"
            labelFor="confPassword"
            type="password"
            id="confPassword"
            onChangeHandler={onChangeConfPassword}
            value={confPassword}
            error={
              !errors.passwordError && confPassword !== password
                ? "Passwords not matching"
                : ""
            }
          />
          <Button
            title="Signup"
            type="alternative"
            onClickHandler={(e: React.MouseEvent<HTMLElement>) =>
              handleSignup(e)
            }
          ></Button>
          <AuthFormAlt
            text="Already have an account?"
            path="/login"
            linkText="Sign in"
          />
        </form>
      </div>
    </div>
  );
};
