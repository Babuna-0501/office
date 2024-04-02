import React from "react";
import css from "./headerone.module.css";

const Headerone = (props) => {
  return (
    <div className={css.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div className={css.bond} style={{ marginRight: "16px" }}>
          <p style={{ fontWeight: "700", color: "#78909C" }}>Утас:</p>
          <p style={{ fontWeight: "400", color: "#546E7A" }}>
            {props.data.phone}
          </p>
        </div>
        <div className={css.bond}>
          <p style={{ fontWeight: "700", color: "#78909C" }}>Регистер:</p>
          <p style={{ fontWeight: "400", color: "#546E7A" }}>
            {props.data.register}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div className={css.bond}>
          <p style={{ fontWeight: "700", color: "#78909C" }}>Захиалсан:</p>
          <p style={{ fontWeight: "700", color: "#37474F" }}>
            {props.data.order_date.split("T")[0]}
          </p>
        </div>
        <div
          className={css.bond}
          style={{
            textAlign: "end",
            marginLeft: "16px",
          }}
        >
          <p style={{ fontWeight: "700", color: "#78909C" }}>Хүргүүлэх өдөр:</p>
          <p style={{ fontWeight: "700", color: "#37474F" }}>
            {props.data.delivery_date.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Headerone;
