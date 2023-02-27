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
  error?: string;
};

export const InputItem = ({
  label,
  labelFor,
  type,
  onChangeHandler,
  value,
  id,
  error,
}: InputItemProps) => {
  return (
    <div className={classes["input-item"]}>
      <div>
        <label htmlFor={labelFor}>{label}</label>
        <span className={classes["error-label"]}>{error}</span>
      </div>
      <input
        type={type}
        id={id}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(e.target.value)
        }
        value={value}
        className={error ? classes.error : ""}
      ></input>
    </div>
  );
};
