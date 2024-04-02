import React from "react";

const DateRender = props => {
  const data = props?.value;
  const date = data?.split("T")[0];
  const hour = data?.split("T")[1];
  const hours = hour?.split(".")[0];

  return (
    <div style={{ fontSize: "12px", fontWeight: 400, color: "#37474F" }}>
      {date} {hours}
    </div>
  );
};

export default DateRender;
