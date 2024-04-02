import React, { useState } from "react";
import css from "./upointhistory.module.css";
import closeBtn from "../assets/close.svg";

const UpointHistory = (props) => {
  // console.log("upoint history", props);
  return (
    <div id="bg">
      <div id="foo">
        <div className={css.containerMain}>
          <h1 style={{ color: "#37474F", fontSize: "20px", fontWeight: 700 }}>
            Захиалгын дугаар: {props.data.order_id}
          </h1>

          <span
            className="closebtn"
            onClick={() => props.setUpointHistory(false)}
          >
            <img src={closeBtn} alt="close button" />
          </span>
        </div>
        <div className={css.shopDetails}>
          <div className={css.deliveryInfo}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Upoint оноо олголтын түүх</h3>
              <h3>Лог</h3>
            </div>
            <div className={css.container}>
              <ul>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "#6957C5",
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: "50%",
                    }}
                  >
                    Урамшууллын бодогдсон оноо:
                  </span>
                  <span className={css.onoo}>
                    {props.data.upoint_bonus_amount}
                  </span>
                  <span className={css.log}>
                    {props.data.upoint_bonus_original_amount}
                  </span>
                </li>
                <li
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      color: "#6957C5",
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: "50%",
                    }}
                  >
                    Урамшуулалын оноо:
                  </span>
                  <span className={css.onoo}>
                    {props.data.upoint_added_bonus_amount}
                  </span>
                  <span className={css.log}>
                    {props.data.upoint_added_bonus_original_amount}
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "#6957C5",
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: "50%",
                    }}
                  >
                    Урамшууллын буцаасан оноо:
                  </span>
                  <span className={css.onoo}>
                    {props.data.upoint_return_bonus_amount}
                  </span>
                  <span className={css.log}></span>
                </li>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: "50%",
                    }}
                  >
                    Зарцуулсан оноо:
                  </span>
                  <span className={css.onoo}>
                    {props.data.upoint_consume_amount}
                  </span>
                  <span className={css.log}>
                    {props.data.upoint_consume_original_amount}
                  </span>
                </li>

                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "red",
                      fontSize: "1rem",
                      fontWeight: 700,
                      width: "50%",
                    }}
                  >
                    Буцаагдсан зарцуулалтын оноо:{" "}
                  </span>
                  <span className={css.onoo}>
                    {props.data.upoint_return_consume_amount}
                  </span>
                  <span className={css.log}></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="order-confirm"></div>
      </div>
    </div>
  );
};

export default UpointHistory;
