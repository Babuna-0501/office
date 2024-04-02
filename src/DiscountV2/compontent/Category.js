import React, { useContext } from "react";

const Category = (props) => {
  let content = props.value.map((item, index) => {
    return (
      <span
        key={index}
        style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}
      >
        {item}
        {", "}
      </span>
    );
  });

  return (
    <div style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
      {content}
    </div>
  );
};

export default Category;
