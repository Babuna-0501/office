import React from "react";
import checkedgray from "../../assets/check box.svg";
import css from "./header.module.css";

const Header = (props) => {
  return (
    <div className={css.container}>
      <img src={checkedgray} />
      {props.name ? <span>{props.name}</span> : null}

      <div className={css.wrapper}>
        <span>{props.title}</span>
        <input placeholder="Хайх" />
      </div>
    </div>
  );
};

export default Header;
