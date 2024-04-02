import React, { useState, useContext } from "react";
import css from "./marshrutheader.module.css";
import arrowLefticon from "../../assets/Arrow - Right.svg";
import XTHook from "../../Hooks/XtHook";

const MarshrutHeader = () => {
  const xtctx = useContext(XTHook);
  const backHandler = () => {
    xtctx.setHi(false);
    xtctx.setPage(0);
  };
  return (
    <div className={css.container}>
      <span className={css.wrapper} onClick={backHandler}>
        Маршрут хувиарлах
      </span>
      {xtctx.page === 1 && (
        <div className={css.sub}>
          <img src={arrowLefticon} alt="sdfd" />
          <span className={css.wrapperspan}>Маршрут тохиргоо</span>
        </div>
      )}
    </div>
  );
};

export default MarshrutHeader;
