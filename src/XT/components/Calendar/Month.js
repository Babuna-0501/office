import React, { useState, useEffect } from "react";
import Days from "./Days";

const Month = (props) => {
  // console.log("props.item", props.item);

  let temp = [];
  let days = ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"];
  let counter = 1;
  for (let i = 0; i <= 42; i++) {
    if (i >= props.item[2] && i <= props.item[1]) {
      // console.log("props.item[2]", props.item[2]);
      // console.log("props.item[1]", props.item[1]);
      // console.log("i", i);
      // console.log("counter", counter);

      temp.push(
        <Days
          data={props.data}
          day={counter}
          month={props.item[3]}
          year={props.item[4]}
          foobar={props.foobar}
          setData={props.setData}
          key={Math.random()}
        />
      );
      counter++;
    } else {
      temp.push(<Days data={null} key={Math.random()} />);
    }
  }

  return (
    <div
      style={{
        width: "248px",
        background: "#FFFFFF",
        padding: "12px",
        border: "1px solid #CFD8DC",
        borderRadius: "8px",
      }}
      key={Math.random()}
    >
      <span style={{ color: "#263238", fontWeight: "700", fontSize: "15px" }}>
        {props.item[0]}
      </span>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {days.map((it) => {
            return (
              <span
                key={Math.random()}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#37474F",
                  fontSize: "10px",
                  fontWeight: "500",
                }}
              >
                {it}
              </span>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {" "}
          {temp}
        </div>
      </div>
    </div>
  );
};

export default Month;
