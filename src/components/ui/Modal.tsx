import React, { ReactNode } from "react";
import classes from "./Modal.module.css";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className={classes["modal-overlay"]} onClick={props.toggle}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={classes["modal-box"]}
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
