import React, { useState } from "react";
import css from "./statuschange.module.css";
const StatusChange = () => {
  const [showHover, setShowHover] = useState(false);
  const data = [
    { id: 1, desc: "Баталгаажуулах" },
    { id: 2, desc: "Цуцлах" },
    { id: 3, desc: "Засварлах" },
  ];
  const functClicked = (id) => {
    console.log("clicked", id);
  };
  return (
    <div className={css.container}>
      {data.map((item, index) => {
        return <div onClick={() => functClicked(item.id)}>{item.desc}</div>;
      })}
    </div>
  );
};

export default StatusChange;
