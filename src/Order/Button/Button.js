import React from "react";
import css from "./button.module.css";
const Button = (props) => {
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <div
      className={`${css.container} ${props.className}`}
      onClick={clickHandler}
    >
      {props.children}
    </div>
  );
};

export default Button;
