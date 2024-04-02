import React from "react";
import css from "./productheader.module.css";
const ProductHeader = () => {
  return (
    <div className={css.header}>
      <div
        className={css.headerone}
        style={{
          width: "100px",
        }}
      >
        <span>ID</span>
        <input disabled />
      </div>
      <div
        className={css.headerone}
        style={{
          width: "200px",
        }}
      >
        <span>Бүтээгдэхүүний нэр</span>
        <input disabled />
      </div>
      <div
        className={css.headerone}
        style={{
          width: "200px",
        }}
      >
        <span>Зураг</span>
        <input disabled />
      </div>
    </div>
  );
};

export default ProductHeader;
