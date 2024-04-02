import React from "react";
import css from "./customer.module.css";
import { styles } from "./style";

const Customer = (props) => {
  // console.log("props.customer", props.data);
  const checkedHandler = () => {
    props.onClick(props.data, props.index);
  };
  return (
    <div className={css.container}>
      <div
        className={css.columnheader}
        style={{
          ...styles.checkboxcontainer,
        }}
      >
        <input type="checkbox" onClick={checkedHandler} />
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.codeContainer,
        }}
      >
        <span>{props.data.customer_name}</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.positionContainer,
        }}
      >
        <span>{props.data.businesName}</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.nameContainer,
        }}
      >
        <span>Ү.ажиллагааны чиглэл</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.dateContainer,
        }}
      >
        <span>{props.data.tradeshop_name}</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.zoneContainer,
        }}
      >
        <span>{props.data.cityName}</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.settingContainer,
        }}
      >
        <span>{props.data.khorooName}</span>
      </div>
      <div
        className={css.columnheader}
        style={{
          ...styles.addressContainer,
        }}
      >
        <span>{props.data.address}</span>
      </div>
    </div>
  );
};

export default Customer;
