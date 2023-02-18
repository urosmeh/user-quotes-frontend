import { ChangeEvent } from "react";
import classes from "./InputItem.module.css";

export type InputItemProps = {
  label: string;
  labelFor: string;
  id: string;
  type: "password" | "text"; //add more if needed
  onChangeHandler: (val: string) => void;
  value: string;
  invalid?: boolean;
};

export const InputItem = ({
  label,
  labelFor,
  type,
  onChangeHandler,
  value,
  id,
  invalid,
}: InputItemProps) => {
  return (
    <div className={classes["input-item"]}>
      <label htmlFor={labelFor}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(e.target.value)
        }
        value={value}
        className={invalid ? classes.error : ""}
      ></input>
    </div>
  );
};
