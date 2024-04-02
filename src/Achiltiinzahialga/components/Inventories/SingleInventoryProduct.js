import { Checkbox } from "../common";
import css from "./singleInventoryProduct.module.css";

import { useEffect, useState } from "react";

const SingleInventoryProduct = (props) => {
  const {
    zIndex,
    product,
    categories,
    checked,
    checkHandler,
    index,
    setProductData,
  } = props;

  return (
    <div
      className={css.container}
      style={{ zIndex }}
      key={index}
      onClick={() => {
        setProductData(product);
        props.setActiveTab(3);
      }}
    >
      {/* checkbox */}
      <div
        className={css.fieldStyle}
        style={{
          width: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Checkbox onChange={checkHandler} checked={checked} />
      </div>

      {/* img */}
      <div className={css.fieldStyle} style={{ width: 78 }}>
        <img
          src={
            product.image[0] !== " "
              ? product.image[0]
              : "https://ebazaar.mn/media/product/9989646044764598603108547708202205130611436585188195547456197872435120.png"
          }
          alt="img"
        />
      </div>

      {/* product name */}
      <div className={css.fieldStyle} style={{ width: 200 }}>
        <span>{product.name}</span>
      </div>

      {/* category */}
      <div className={css.fieldStyle} style={{ width: 150 }}>
        <span>{product.category_id}</span>
      </div>

      {/* stock */}
      <div className={css.fieldStyle} style={{ width: 150 }}>
        <span>{product.stock}</span>
      </div>

      {/* barcode */}
      <div className={css.fieldStyle} style={{ width: 120 }}>
        <span>{product.bar_code}</span>
      </div>

      {/* sku */}
      <div className={css.fieldStyle} style={{ width: 120 }}>
        <span>{product.sku}</span>
      </div>

      {/* price */}
      <div className={css.fieldStyle} style={{ width: 90 }}>
        <span>-</span>
      </div>
    </div>
  );
};

export default SingleInventoryProduct;
