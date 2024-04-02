import React from "react";
import css from "./modal.module.css";
import editsquare from "../../assets/Edit Square.svg";

const Modal = (props) => {
  return (
    <div className={css.container}>
      <div className={css.headerwrapper}>
        <span>{props.title}</span>
        <img src={editsquare} />
      </div>

      {props.children}
    </div>
  );
};

export default React.memo(Modal);
