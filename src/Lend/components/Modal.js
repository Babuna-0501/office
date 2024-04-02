import React from "react";
import closeImage from "../../assets/close.svg";
import okIcon from "../../assets/OK.svg";
import css from "./modal.module.css";

export const Modal = (props) => {
  const closeHandler = () => {
    props.onClick();
  };
  return (
    <div className={css.container}>
      <div className={css.closewrapper}>
        <img src={closeImage} alt="close button" onClick={closeHandler} />
      </div>
      <div className={css.bodywrapper}>
        <img src={okIcon} alt="okay button" />
        <p>Амжилттай</p>
      </div>
      <div className={css.footerwrapper}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};
