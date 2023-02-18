import { AuthHeader } from "../../ui/AuthHeader";
import classes from "./SignupPage.module.css";
import signupAvatar from "../../../assets/img/uploadAvatar.png";
import { Button } from "../../ui/Button";
import { AuthFormAlt } from "./AuthFormAlt";
import { useLoginMutation, useSignupMutation, saveLogin } from "../../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const SignupPage = () => {
  const [signup, { isSuccess }] = useSignupMutation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await signup({ username, password }).unwrap();
      console.log(res);
      debugger;
      if (res.username) {
        const { token, id } = await login({ username, password }).unwrap();
        dispatch(saveLogin({ token, id }));
      }
    } catch (error) {
      console.log(error);
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
        <form>
          <div className={classes["input-item"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              value={username}
            ></input>
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
            ></input>
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              id="confPassword"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfPassword(e.target.value)
              }
              value={confPassword}
            ></input>
          </div>
          <div className={classes["input-item"]}>
            <Button
              title="Signup"
              type="alternative"
              onClickHandler={(e: React.MouseEvent<HTMLElement>) =>
                handleSignup(e)
              }
            ></Button>
          </div>
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
