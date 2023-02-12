import { AuthHeader } from "../../ui/AuthHeader";
import classes from "./SignupPage.module.css";
import signupAvatar from "../../../assets/img/uploadAvatar.png";
import { Button } from "../../ui/Button";
import { AuthFormAlt } from "./AuthFormAlt";

export const SignupPage = () => {
  return (
    <div className={classes.content}>
      <AuthHeader
        header="What is your name?"
        subtitle="Your name will appear on quotes and your public profile."
      />
      <img alt="signup-avatar" src={signupAvatar} style={{}}></img>
      <form>
        <form>
          <div className={classes["input-item"]}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email"></input>
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>
          </div>
          <div className={classes["input-item"]}>
            <Button
              title="Login"
              type="alternative"
              onClickHandler={() => console.log("test")}
            ></Button>
          </div>
          <AuthFormAlt text="Already have an account?" path="/login" linkText="Sign in"/>
        </form>
      </form>
    </div>
  );
};
