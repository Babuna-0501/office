import React from "react";
import css from "./button.module.css";

const Button = (props) => {
  const handler = () => {
    props.onClick();
  };
  return (
    <button className={`${css.container} ${props.className}`} onClick={handler}>
      {props.children}
    </button>
  );
};

export default Button;
