import React from "react";
import css from "./input.module.css";
const Input = (props) => {
  return (
    <div className={css.inputcontainer} style={{ width: props.width }}>
      <span>{props.name}</span>
      <input />
    </div>
  );
};

export default Input;
