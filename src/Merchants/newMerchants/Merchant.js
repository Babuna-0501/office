import React from "react";
import css from "./merchant.module.css";
import { styles } from "./style";

const Merchant = (props) => {
  let item = props.data;
  let phoneOne = item.Phone ? item.Phone : "утасгүй";
  let phoneTwo;

  if (phoneOne.length > 8) {
    phoneOne = phoneOne.split(",")[0];
    phoneTwo = phoneOne.split(",")[1];
  }
  let supplierName = props.maindata.suppliers.map((x) => {
    if (item.SupplierID === x.id) {
      return x.name;
    }
  });

  let dateTime = "00:00";
  if (item.CreatedDate) {
    dateTime = item.CreatedDate.split("T")[0];
  }

  let busType = "байхгүй";
  if (props.data.BusinessTypeID !== null) {
    busType =
      props.maindata.businessType[`${Number(props.data.BusinessTypeID)}`]
        ?.business_type_name;
  }

  return (
    <div className={css.container}>
      <div style={styles.checkboxcontainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{props.data.RequestID}</span>
        </div>
      </div>
      <div style={styles.statusContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{supplierName}</span>
        </div>
      </div>
      <div style={styles.orderImageContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{props.data.isActive}</span>
        </div>
      </div>
      <div style={styles.orderDateContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{dateTime}</span>
        </div>
      </div>
      <div style={styles.deliverDateContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{props.data.TradeshopName}</span>
        </div>
      </div>
      <div style={styles.deliverDateContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{busType}</span>
        </div>
      </div>
      <div style={styles.busTypeContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{props.data.TradeshopID}</span>
        </div>
      </div>
      <div style={styles.totalPriceContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle} title={props.data.Address1}>
            {props.data.Address1}
          </span>
        </div>
      </div>
      <div style={styles.upointContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>
            {phoneOne}
            <br></br>
            {phoneTwo ? phoneTwo : ""}
          </span>
        </div>
      </div>
      <div style={styles.paidPriceContainer}>
        <div className={css.wrapper}>
          <span className={css.headerTitle}>{item.RegisterNo}</span>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
