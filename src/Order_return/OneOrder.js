import React from "react";
import css from "./oneorder.module.css";

const OneOrder = (props) => {
  console.log("props oneorder", props);
  let totalPrice = Number(props.item.price) * Number(props.item.quantity);
  return (
    <div className={css.container}>
      <div className={css.firstwrapper}>
        <div className={css.imageContainer}>
          <img
            src={
              props.item.product_image
                ? props.item.product_image
                : "http://ebazaar.mn/icon/noti.svg"
            }
            alt="product image"
          />
        </div>
        <div className={css.detailWrapper}>
          <h3 className={css.hd3} style={{ fontWeight: 300 }}>
            {props.item.product_name}
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: "#90A4AE",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {props.item.price.toLocaleString()}₮
            </span>
            <span
              style={{
                color: "#FFA400",
                fontSize: "12px",
                fontWeight: 700,
                marginLeft: "5px",
              }}
            >
              {" "}
              x {props.item.quantity}
            </span>
            <span
              style={{
                color: "#263238",
                fontSize: "14px",
                fontWeight: 700,
                marginLeft: "5px",
              }}
            >
              {" "}
              {totalPrice.toLocaleString()}₮
            </span>
          </div>
          <div className={css.barcodeContainer}>
            {props.item.product_sku ? (
              <span>Бүтээгдэхүүн sku : {props.item.product_sku}</span>
            ) : null}

            {props.item.product_bar_code ? (
              <span> Barcode : {props.item.product_bar_code}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneOrder;
