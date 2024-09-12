import React from "react";
import css from "./shipdate.module.css";

const Shipdate = (props) => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <span
          style={{
            fontWeight: "600",
            fontSize: props.pFont,
          }}
        >
          Захиалгын дугаар :{" "}
        </span>
        <span
          style={{
            fontWeight: "700",
            marginLeft: "10px",
            fontSize: props.pFont,
          }}
        >
          {props.data.order_id}
        </span>
      </div>
      <div className={css.wrapper}>
        <span
          style={{
            fontWeight: "600",
            fontSize: props.pFont,
          }}
        >
          Хүргэлтийн өдөр :{" "}
        </span>
        <span
          style={{
            fontWeight: "700",
            marginLeft: "10px",
            fontSize: props.pFont,
          }}
        >
          {props.data.delivery_date.split("T")[0]}
        </span>
      </div>
      {/* <div className={css.wrapper}>
        <span
          style={{
            fontWeight: "600",
          }}
        >
          Нийт дүн :{" "}
        </span>
        <span
          style={{
            fontWeight: "700",
            marginLeft: "10px",
          }}
        >
          {props.data.grand_total.toLocaleString() + "₮"}
        </span>
      </div> */}
    </div>
  );
};

export default Shipdate;
