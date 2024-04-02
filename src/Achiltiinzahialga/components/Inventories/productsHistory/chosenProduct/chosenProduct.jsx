import React from "react";
import css from "./chosenProduct.module.css";

const ChosenProduct = (props) => {
  const { productData } = props;

  return (
    <div className={css.container} key={productData._id}>
      <div className={css.left}>
        <img
          src={
            productData.image[0] !== " "
              ? productData.image[0]
              : "https://ebazaar.mn/media/product/9989646044764598603108547708202205130611436585188195547456197872435120.png"
          }
          alt={productData._id}
        />
      </div>
      <div className={css.right}>
        <span>
          <b>Barcode:</b> {productData.bar_code}
        </span>
        <span>
          <b>Sku:</b> {productData.sku}
        </span>
        <span>
          <b>Нэр:</b> {productData.name}
        </span>
        <span>
          <b>Үлдэгдэл:</b> {productData.stock}
        </span>
      </div>
    </div>
  );
};

export default ChosenProduct;
