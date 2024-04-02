import React from "react";
import css from "./zone.module.css";
const Zone = (props) => {
  return <span className={css.container}>{props.title}</span>;
};

export default React.memo(Zone);
