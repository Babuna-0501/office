import React from "react";
import css from "./li.module.css";
import dangerCicle from "../../assets/Danger Circle.svg";
import circleGreen from "../../assets/circle_green.svg";

const Li = (props) => {
  const Handler = () => {
    props.onClick(props.index);
  };
  return (
    <li className={css.wrapper} onClick={Handler}>
      <img
        src={props.index === props.active ? circleGreen : dangerCicle}
        alt="circle"
        style={{
          width: "15px",
          height: "15px",
        }}
      />

      <span>{props.data.name}</span>
    </li>
  );
};

export default Li;
