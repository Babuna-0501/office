import React from "react";
import css from "./btncontainer.module.css";

const Btncontainer = (props) => {
  return (
    <button
      className={`${css.bntcontainer} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Btncontainer;
