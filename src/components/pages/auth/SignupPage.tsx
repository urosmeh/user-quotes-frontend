import { AuthHeader } from "../../ui/AuthHeader";
import classes from "./SignupPage.module.css";
import signupAvatar from "../../../assets/img/uploadAvatar.png";
import { Button } from "../../ui/Button";
import { AuthFormAlt } from "./AuthFormAlt";
import { useLoginMutation, useSignupMutation, saveLogin } from "../../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputItem } from "../../ui/InputItem";

export const SignupPage = () => {
  const [signup, { isSuccess }] = useSignupMutation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onChangeUsername = (value: string) => {
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeConfPassword = (value: string) => {
    setConfPassword(value);
  };

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
          <InputItem
            label="Email"
            labelFor="email"
            type="text"
            id="email"
            onChangeHandler={onChangeUsername}
            value={username}
          />
          <InputItem
            label="Password"
            labelFor="password"
            type="password"
            id="password"
            onChangeHandler={onChangePassword}
            value={password}
          />
          <InputItem
            label="Confrim password"
            labelFor="confPassword"
            type="password"
            id="confPassword"
            onChangeHandler={onChangeConfPassword}
            value={confPassword}
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
