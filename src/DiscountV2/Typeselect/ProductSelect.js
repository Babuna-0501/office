import React from "react";
import css from "./productselect.module.css";

const ProductSelect = () => {
  return (
    <div className={css.container}>
      <select>
        <option>Hi</option>
        <option>Hello</option>
      </select>
    </div>
  );
};

export default ProductSelect;
