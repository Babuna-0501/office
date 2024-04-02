import React, { useState, useContext } from "react";
import css from "./multiproducts.module.css";
import checkbox from "../../assets/check box.svg";
import Multiproduct from "./Multiproduct";
import { MultiStyles } from "./style";
import SMSHook from "../../Hooks/SMSHook";

const MultiProducts = (props) => {
  // console.log("props", props);

  const smsctx = useContext(SMSHook);
  // console.log("snmsctx,102", smsctx);
  const DeleteHandler = (item) => {
    // console.log("delete", item);

    let newdata = smsctx.multiProducts.filter((x, i) => i !== item);
    smsctx.setMultiProducts(newdata);
  };
console.log("smsctx.multiProducts", smsctx.multiProducts);
return (
  <div className={css.container}>
    <div className={css.header}>
      <div
        className={css.oneheader}
        style={{
          ...MultiStyles.product_name,
        }}
      >
        <span>Багцын нэр</span>
        <input
          style={{
            ...MultiStyles.product_name,
          }}
        />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>IMG</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>Бүтээгдэхүүний нэр</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>Ангилал</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>Брэнд</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "100px",
        }}
      >
        <span>Баркод</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "100px",
        }}
      >
        <span>SKU</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>Үнийн дүн төлөвлөгөө</span>
        <input />
      </div>
      <div
        className={css.oneheader}
        style={{
          width: "150px",
        }}
      >
        <span>Тоо/Ширхэг төлөвлөгөө</span>
        <input />
      </div>
    </div>
    <div className={css.body}>
      {smsctx.multiProducts &&
        smsctx.multiProducts.map((item, index) => {
          return (
            <Multiproduct
              key={index}
              item={item}
              brand={props.brand}
              onDelete={() => DeleteHandler(index)}
            />
          );
        })}
    </div>
  </div>
);
};

export default MultiProducts;
