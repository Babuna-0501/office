import React from "react";
import css from "./onezone.module.css";
import checkedOn from "../assets/Tick Square on.svg";
import checkOff from "../assets/Tick Square.svg";
import chevronDown from "../assets/chevron-down.svg";

const OneZone = (props) => {
  const checkedHandler = () => {
    let update = [...props.data];
    update = update.map((x, index) => {
      if (x._id === props.item._id) {
        return {
          ...x,
          checked: props.item.checked === true ? false : true,
        };
      } else {
        return x;
      }
    });
    props.setData((prev) => [...update]);
  };
  return (
    <div className={css.container}>
      <div
        className={css.wrapper}
        onClick={checkedHandler}
        style={{
          width: "200px",
        }}
      >
        <img src={props.item.checked ? checkedOn : checkOff} />
        <span>{props.item.name}</span>
      </div>
      <div
        style={{
          width: "200px",
        }}
        className={css.wrapper}
      >
        <span> {props.item.createdBy}</span>
      </div>
    </div>
  );
};

export default OneZone;
