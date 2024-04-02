import React from "react";
import css from "./movement.module.css";

const Movement = (props) => {
  const { movementData } = props;

  console.log("movementData", movementData);

  function formatDateToDayMonthYearWithTime(dateTimeString) {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-GB", options); // Adjust the locale as needed
  }

  return (
    <div className={css.container}>
      <span
        style={{
          width: "100px",
          overflow: "hidden",
          justifyContent: "flex-start",
        }}
      >
        {movementData.documentId}
      </span>
      <span style={{ minWidth: "200px" }}>
        {formatDateToDayMonthYearWithTime(movementData.date).replace(/,/g, " ")}
      </span>
      <span style={{ width: "80px" }}>{movementData?.buyPrice}</span>
      <span style={{ width: "80px" }}>{movementData?.sellPrice}</span>
      <span style={{ width: "80px" }}>{movementData?.discount}</span>
      <span style={{ width: "80px" }}>{movementData?.seriesId}</span>

      <span style={{ minWidth: "250px" }}>{movementData.note}</span>
      <span
        style={
          movementData.type === 1
            ? { fontWeight: "700", color: "green" }
            : { fontWeight: "700", color: "red" }
        }
      >
        {movementData.type === 1 ? "+" : "-"}
        {movementData.quantity}
      </span>
      <span>{movementData.stock}</span>
    </div>
  );
};

export default Movement;
