import React, { useEffect } from "react";
import css from "./priceplan.module.css";

const PricePlan = (props) => {
  let newWidth = "";

  useEffect(() => {
    newWidth = (130 * props.actionPrice) / props.price;
  }, [props]);

  return (
    <div
      style={{
        width: "130px",
      }}
      className={css.pricewrapper}
    >
      <span>{props.price && props.price.toLocaleString() + "₮"}</span>
      <span
        style={{
          borderBottom: "10px solid #F2F2F2",
          position: "relative",
          borderRadius: "1.5px",
        }}
      >
        <span
          className={css.wrapper}
          style={{
            width: `${newWidth}px`,
            borderBottom: "10px solid #2AB674",
            borderRadius: "1.5px",
          }}
        ></span>
      </span>
    </div>
  );
};

export default PricePlan;
