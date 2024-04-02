import React from "react";
import css from "./newmodal.module.css";

const NewModal = (props) => {
  return (
    <div className={`${css.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default NewModal;
