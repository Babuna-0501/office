import React from "react";
import css from "./header.module.css";

const Header = (props) => {
  return (
    <p
      className={css.container}
      style={{
        fontSize: props.fontsize ? props.fontsize : "14px",
        fontWeight: props.fontWeight ? props.fontWeight : "400",
        color: props.color ? props.color : "#37474F",
        marginBottom: props.marginBottom ? props.marginBottom : "0",
      }}
    >
      {props.title}
    </p>
  );
};

export default Header;
