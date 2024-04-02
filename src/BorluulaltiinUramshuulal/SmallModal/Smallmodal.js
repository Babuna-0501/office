import React from "react";
import css from "./smallmodal.module.css";
import closeicon from "../../assets/close.svg";
import okgreen from "../../assets/ok_green.svg";

const Smallmodal = () => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.closewrapper}>
          <img
            src={closeicon}
            alt="close icon"
            style={{
              width: "25px",
              cursor: "pointer",
              height: "25px",
            }}
          />
        </div>
        <div>
          <img
            src={okgreen}
            alt="close icon"
            style={{
              width: "78px",
              cursor: "pointer",
              height: "78px",
            }}
          />
        </div>
        <div className={css.info}>Төлөвлөгөө амжилттай үүслээ</div>
      </div>
    </div>
  );
};

export default Smallmodal;
