import React, { useState, useEffect } from "react";
import css from "./modal.module.css";

const Modal = (props) => {
  const [month, setMonth] = useState(null);
  useEffect(() => {
    setMonth(props.newMonth);
    // console.log("props", props.newMonth);
    // props.setShineMonth(props.newMonth);
  }, [props]);
  console.log("month", month);

  return (
    <div className={css.background}>
      <div className={css.modal}>
        <div>
          <div>
            <h4
              style={{
                color: "#37474F",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Баримт бүртгэх сараа сонгоно уу
            </h4>
          </div>
          <div className={css.sarbody}>
            <select
              value={month}
              onChange={(e) => {
                // console.log("e,.target.value", e.target.value);
                setMonth(e.target.value);
                props.setShineMonth(e.target.value);
              }}
            >
              <option value={props.newMonth}>{`${props.newMonth} Сар`}</option>
              <option value={props.newMonth + 1}>{`${
                props.newMonth + 1
              } Сар`}</option>
            </select>
          </div>
          <div className={css.btncontainer}>
            <button
              className={css.cancelbtn}
              onClick={(e) => {
                props.setModalOpen(false);
                setMonth(null);
                props.setShineMonth(null);
              }}
            >
              Цуцлах
            </button>
            <button
              className={css.confirmbtn}
              onClick={(e) => {
                props.setShineMonth(month);
                props.SendTwoHandler();
                props.setModalOpen(false);
              }}
            >
              Үргэлжлүүлэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
