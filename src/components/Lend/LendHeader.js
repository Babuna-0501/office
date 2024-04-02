import React, { useContext } from "react";
import css from "./lendheader.module.css";
import LendHook from "../../Hooks/LendHook";
import arrowRight from "../../assets/Arrow - Right.svg";
import AppHook from "../../Hooks/AppHook";
const LendHeader = () => {
  const lendctx = useContext(LendHook);
  const appctx = useContext(AppHook);
  const pageHandler = () => {
    lendctx.setLendState(false);
    lendctx.setZoneState(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <span onClick={pageHandler}>Ажилтан</span>

        {lendctx.lendState && (
          <div className={css.settingwrapper}>
            <img src={arrowRight} alt="arrow right" />{" "}
            <span className={css.lendsetting}>Зээлийн тохиргоо</span>
          </div>
        )}
        {lendctx.zoneState && (
          <div className={css.settingwrapper}>
            <img src={arrowRight} alt="arrow right" />{" "}
            <span className={css.lendsetting}>Маршрут тохиргоо</span>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default LendHeader;
