import React from "react";
import classes from "../ui/Button.module.css";

// enum ButtonType {
//   PRIMARY = "primary",
//   ALTERNATIVE = "alternative",
// }

interface ButtonProps {
  title: string;
  onClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  type: "primary" | "alternative"; //primary | alternative
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClickHandler,
  type,
}) => {
  return (
    <button
      className={`${classes["main-button"]} ${classes[type]}`}
      onClick={onClickHandler}
    >
      <span className={type === "alternative" ? classes["button-text"] : ""}>
        {title}
      </span>
    </button>
  );
};
