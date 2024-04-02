import React from "react";

const Name = (props) => {
  return (
    <div>
      <span style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
        {props?.value}
      </span>
    </div>
  );
};

export default Name;
