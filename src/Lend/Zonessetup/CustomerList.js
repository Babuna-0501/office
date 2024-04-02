import React from "react";
import css from "./customerlist.module.css";
import { styles } from "./style";

const CustomerList = (props) => {
  console.log("data", props.data);
  return (
    <div className={css.headerwrappertable}>
      <div className={css.headerone} style={{ ...styles.checkboxcontainer }}>
        <span>{props.data.customer_name}</span>
      </div>
      <div className={css.headerone} style={{ ...styles.codeContainer }}>
        <span>{props.data.businesName}</span>
      </div>
      <div className={css.headerone} style={{ ...styles.positionContainer }}>
        <span>{props.data.businesName}</span>
      </div>
      <div className={css.headerone} style={{ ...styles.nameContainer }}>
        <span>{props.data.tradeshop_name}</span>
      </div>{" "}
      <div className={css.headerone} style={{ ...styles.dateContainer }}>
        <span>{props.data.cityName}</span>
      </div>
      <div className={css.headerone} style={{ ...styles.zoneContainer }}>
        <span>{props.data.khorooName}</span>
      </div>
      <div className={css.headerone} style={{ ...styles.addressContainer }}>
        <span>{props.data.address}</span>
      </div>
    </div>
  );
};

export default CustomerList;
