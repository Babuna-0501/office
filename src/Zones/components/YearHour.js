import React from "react";

const YearHour = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: "400",
          color: "#37474F",
        }}
      >
        {props?.year}
      </span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: "400",
          color: "#37474F",
        }}
      >
        {props?.hour}
      </span>
    </div>
  );
};

export default YearHour;
