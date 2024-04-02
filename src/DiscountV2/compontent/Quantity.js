import React from "react";

const Quantity = (props) => {
  // console.log("props");
  let qt = props.value ? props.value.toLocaleString() : "";
  return (
    <div>
      <span style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
        {qt}ш
      </span>
    </div>
  );
};

export default Quantity;
