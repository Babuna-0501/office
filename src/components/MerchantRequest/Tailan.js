import React from "react";
import css from "./tailan.module.css";
import closeIcon from "../../assets/close.svg";
import CSV from "../CSV/CSV";

const Tailan = (props) => {
  // console.log("tailan props.", props);
  const closeHandler = () => {
    props.onClick();
  };
  return (
    <div className={css.container}>
      <div className={css.one}>
        <img src={closeIcon} onClick={closeHandler} />
      </div>
      {props.data && <CSV name={props.name} data={props.data} />}
    </div>
  );
};

export default Tailan;
