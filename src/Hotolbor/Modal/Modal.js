import React from "react";
import css from "./modal.module.css";
import flagicon from "../../assets/flag 2.svg";
import { data } from "./data";

const Modal = () => {
  return (
    <div className={css.container}>
      <div className={css.modal}>
        <div className={css.headercontainer}>
          <div className={css.headerimage}>
            <img src={flagicon} alt="flag icon" />
          </div>
          <div className={css.headerP}>
            <p>Миний хөтөлбөрийн төрөл сонгох</p>
          </div>
        </div>
        <div className={css.choseContainer}>
          {data.map((item, index) => {
            return (
              <div className={css.middlecontainer} key={index}>
                <img />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
        <div className={css.btncontainer}>
          <button>Шинээр нэмэх</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
