import React from "react";
import targetImg from "../../assets/zonning 3.svg";

const Content = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "800px",
        flexDirection: "column",
      }}
    >
      <img
        src={targetImg}
        style={{
          width: "250px",
          height: "250px",
        }}
      />
      <span
        style={{
          fontSize: "14px",
          fontWeight: "400",
          color: "#999999",
        }}
      >
        Одоогоор төлөвлөгөө үүсээгүй байна
      </span>
    </div>
  );
};

export default Content;
