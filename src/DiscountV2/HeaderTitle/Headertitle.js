import React from "react";
import css from "./headertitle.module.css";

const Headertitle = (props) => {
  return (
    <div className={css.container}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default Headertitle;
