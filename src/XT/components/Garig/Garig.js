import React, { useState } from "react";
import css from "./garig.module.css";
import checkbox from "../../../assets/check box.svg";

const data = [
  { id: 0, name: "Ням" },
  { id: 1, name: "Даваа" },
  { id: 2, name: "Мягмар" },
  { id: 3, name: "Лхагва" },
  { id: 4, name: "Пүрэв" },
  { id: 5, name: "Баасан" },
  { id: 6, name: "Бямба" },
];

const Garig = (props) => {
  const [checked, setChecked] = useState(new Array(data.length).fill(false));
  const handleOnChange = (position) => {
    console.log("position", position);
    if (position === 0) {
      const updatedCheckedState = checked.map((item, index) =>
        index === position ? !item : item
      );
      setChecked(updatedCheckedState);
      props.setGarigState(updatedCheckedState);
    }
    if (position !== 0) {
      const updatedCheckedState = checked.map((item, index) =>
        index === position ? !item : item
      );
      setChecked(updatedCheckedState);
      props.setGarigState(updatedCheckedState);
    }
    props.onClick(position);
  };
  console.log("checked", checked);
  return (
    <div className={css.container}>
      {data.map((item, i) => {
        return (
          <div
            className={css.wrapper}
            style={{
              border: checked[i] ? "1px solid #ffa400" : "1px solid #CFD8DC",
              background: checked[i] ? "#FFEDCC" : "#fff",
            }}
            key={i}
          >
            {/* <img src={checkbox} alt="cehck box" /> */}
            <input
              type="checkbox"
              id={`custom-checkbox-${i}`}
              name={item}
              value={item}
              checked={checked[i]}
              onChange={() => handleOnChange(i)}
            />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Garig;
