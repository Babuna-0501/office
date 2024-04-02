import React from "react";
import css from "./wrapper.module.css";

const Wrapper = (props) => {
  return (
    <div className={`${css.wrapper} ${css.className}`}>{props.children}</div>
  );
};

export default Wrapper;
