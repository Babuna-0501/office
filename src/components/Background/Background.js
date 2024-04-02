import React from "react";
import css from "./background.module.css";

const Background = (props) => {
  return (
    <div className={`${css.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Background;
