import React from "react";
import css from "./header.module.css";
const Header = () => {
  return (
    <div className={css.container}>
      <span
        style={{
          width: "100px",
        }}
      >
        ID
      </span>
      <span style={{ minWidth: "200px" }}>Date</span>
      <span style={{ width: "80px" }}>Buy Price</span>
      <span style={{ width: "80px" }}>Sell Price</span>
      <span style={{ width: "80px" }}>Discount</span>
      <span style={{ width: "80px" }}>Serius number</span>

      <span style={{ minWidth: "250px" }}>Note</span>
      <span>Quantity</span>
      <span>Stock</span>
    </div>
  );
};

export default Header;
