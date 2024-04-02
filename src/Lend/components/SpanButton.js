import React from "react";
import css from "./spanbutton.module.css";
import plusIcon from "../../assets/plus icon.svg";

const SpanButton = (props) => {
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <div
      className={`${css.container} ${props.className}`}
      onClick={clickHandler}
    >
      {props.children}

      <img src={plusIcon} className={css.image} />
    </div>
  );
};

export default SpanButton;
