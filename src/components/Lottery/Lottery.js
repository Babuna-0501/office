import React, { useContext } from "react";
import css from "./lottery.module.css";
import upload from "../../assets/Upload_white.svg";

const Lottery = () => {
  // console.log("ctx----------", ctx);

  return (
    <div className={css.container}>
      {/* <div className={css.firstBtn} onClick={() => ctx.setImportData(true)}>
        <img src={upload} alt="upload" />
        <span>Import</span>
      </div>
      <div className={css.firstBtn} onClick={() => ctx.setExportReport(true)}>
        <img src={upload} alt="upload" />
        <span>Export</span>
      </div> */}
    </div>
  );
};

export default Lottery;
