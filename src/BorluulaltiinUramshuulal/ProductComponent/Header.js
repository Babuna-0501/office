import React from "react";
import css from "./header.module.css";

const Header = (props) => {
  return <div className={css.container}>{props.title}</div>;
};

export default Header;
