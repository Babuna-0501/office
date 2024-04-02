import React from "react";

const IDcomponents = props => {
  return (
    <div
      style={{
        textDecoration: "underline",
        color: "#706AC5",
        fontSize: "12px",
        fontWeight: "400",
        cursor: "pointer"
      }}
    >
      {props?.value}
    </div>
  );
};

export default IDcomponents;
