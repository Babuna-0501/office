import React from "react";
import closeImage from "../../assets/close.svg";
import css from "./headers.module.css";

const Headers = (props) => {
  const cancelHandler = () => {
    props.onClick();
  };
  return (
    <div className={css.headerContainer}>
      <p className={css.headerTitle}>{props.title}</p>
      <img src={closeImage} className={css.closeimg} onClick={cancelHandler} />
    </div>
  );
};

export default Headers;
