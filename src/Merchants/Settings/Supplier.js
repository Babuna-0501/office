import React from "react";
import css from "./supplier.module.css";
import checkboxIcon from "../../assets/check box.svg";
import checkboxIconChecked from "../../assets/check box_black.svg";

const Supplier = (props) => {
  return (
    <div
      className={css.container}
      onClick={() => {
        let aa = [...props.suppliers];
        aa.find((e) => e.id === props.item.id).chosed = !props.item.chosed;
        // console.log("aa", aa);
        console.log("props item", props.item);
        props.setSuppliers(aa);
      }}
    >
      <img
        src={props.item.chosed ? checkboxIconChecked : checkboxIcon}
        style={{
          width: "28px",
          height: "28px",
        }}
        alt="check box icon"
      />
      <span>{props.item.name}</span>
    </div>
  );
};

export default Supplier;
