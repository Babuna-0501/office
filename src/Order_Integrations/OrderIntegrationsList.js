import React from "react";
import { styles } from "./style";
import css from "./orderintegrationslist.module.css";

const OrderIntegrationsList = ({ data, company }) => {
  console.log("data --------------", data);
  return (
    <div className={css.container}>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{data ? data.DocumentNo : null}</span>
      </div>
      <div
        style={{
          ...styles.logoContainer,
        }}
        className={css.body}
      >
        <span>{data ? data.TradeShopId : null}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        {company === "cola" ? (
          <span>{data.Name[0]}</span>
        ) : (
          <span>{data.ProductName && data.ProductName}</span>
        )}
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{data ? data.FullAddress : null}</span>
      </div>
      <div
        style={{
          ...styles.moneyContainer,
        }}
        className={`${css.body}`}
      >
        <span className={css.centeritem}>
          {data.Amount && data.Amount.toLocaleString()}
          {data.Amount ? "₮" : ""}
        </span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{`${data.DDate && data.DDate.split("T")[0]} ${
          data.DDate && data.DDate.split("T")[1].substring(0, 8)
        }`}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{`${data.DDate && data.DDate.split("T")[0]} ${
          data.DDate && data.DDate.split("T")[1].substring(0, 8)
        }`}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>
          {data.DocumentNo.includes("CL") ? "MCS COCA COLA" : "Anungoo"}
        </span>
      </div>
    </div>
  );
};

export default OrderIntegrationsList;
