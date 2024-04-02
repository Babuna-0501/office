import React from "react";
import css from "./product.module.css";
import { styles } from "./style";
import checkbox from "../../assets/check box.svg";
import checked from "../../assets/Tick Square_green.svg";

const ProductOne = (props) => {
  console.log("prossssp", props);

  return (
    <div
      className={css.container}
      style={{
        background: props.item._id === null ? "red" : "#fff",
        borderBottom: "1px solid green",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "20px",
        }}
        className={css.first}
      >
        <img
          src={checked}
          alt="checked"
          style={{
            width: "14px",
            height: "14px",
          }}
        />
      </div>
      <p
        style={{
          ...styles.first,
        }}
      >
        {props.item.name}
      </p>
      <p
        style={{
          ...styles.second,
        }}
      >
        {props.item.barcode}
      </p>
      <p
        style={{
          ...styles.third,
        }}
      >
        {props.item.sku}
      </p>
      <p
        style={{
          ...styles.fourth,
        }}
      >
        {props.item.price}
      </p>
    </div>
  );
};

export default ProductOne;
