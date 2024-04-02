import React from "react";
import css from "./background.module.css";

const Background = (props) => {
  return (
    <div className={css.container}>
      <div className={css.first}></div>
      <div className={css.second}>{props.children}</div>
    </div>
  );
};

export default Background;
