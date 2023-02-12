import { PropsWithChildren } from "react";
import classes from "./IconButton.module.css";

interface IconButtonProps {
  onClickHandler: () => void;
}

export const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
  return (
    <>
      <button className={classes["icon-button"]} onClick={props.onClickHandler}>
        {props.children}
      </button>
    </>
  );
};
