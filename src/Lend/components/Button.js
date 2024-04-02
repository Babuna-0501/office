import React from "react";
import css from "./button.module.css";
const Button = (props) => {
  const clickedHandler = () => {
    props.onClick();
  };
  return (
    <button
      className={`${css.container} ${props.className}`}
      onClick={clickedHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
