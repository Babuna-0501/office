import React, { useContext, useEffect } from "react";

const SKU = (props) => {
  //   let content = props.value.map((item) => {
  //     return (
  //       <span style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
  //         {item}
  //       </span>
  //     );
  //   });
  return (
    <div style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
      {/* {props.value.join(", ")} */}
      {props.data.products.join(", ")}
    </div>
  );
};

export default SKU;
