import React from "react";

const Price = props => {
  let price = props?.value?.toLocaleString();
  return (
    <div>
      <span style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
        {price}₮
      </span>
    </div>
  );
};

export default Price;
