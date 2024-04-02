import React from "react";
import css from "./button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${css.container} ${props.className}`}
      onClick={props.clickHandler}
    >
      {props.name}
    </button>
  );
};

export default Button;
