import React, { useContext } from "react";
import css from "./shop.module.css";
import checkbox from "../../assets/check box.svg";
import checked from "../../assets/Tick Square_green.svg";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import AppHook from "../../Hooks/AppHook";

const companyID = ["|1|", "|948|", "|14174|"];

const Shop = (props) => {
  const prodctx = useContext(ProductReportHook);
  const appctx = useContext(AppHook);
  //   console.log("po\rops tradeshop", props);
  let id;
  // if (companyID.includes(appctx.userData.company_id)) {
  id = props.item.tradeshop_id;
  // } else {
  //   id = props.item.TradeshopID;
  // }
  let name = "HI";
  console.log("props", props.item);

  name = props.channel.filter(
    (x) => x.business_type_id == Number(props.item.business_type_id)
  )[0]?.business_type_name;

  let cityname = props.location.filter(
    (x) => x.location_id === Number(props.item.city)
  )[0]?.location_name;
  let khoroo = props.location.filter(
    (x) => x.location_id === Number(props.item.horoo)
  )[0]?.location_name;
  console.log("ASDasdasdasd", prodctx.shopIDS);
  return (
    <div className={css.wrapper}>
      <div
        style={{
          width: "20px",
        }}
        onClick={() => {
          props.setAllChecked(false);
          let ids = prodctx.shopIDS;
          if (ids && id && ids.includes(id)) {
            let update = ids.filter((x) => x !== id);
            prodctx.setShopIDS(update);
          } else {
            prodctx.setShopIDS((prev) => [...prev, id]);
          }
        }}
      >
        <img
          src={
            prodctx.shopIDS && prodctx.shopIDS.includes(id) ? checked : checkbox
          }
          // src={checked}
          alt="alt checked"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </div>
      <div
        className={css.onename}
        style={{
          width: "100px",
        }}
      >
        <span>{props.item.tradeshop_name}</span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "50px",
        }}
      >
        <span>{props.item.business_register} </span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "60px",
        }}
      >
        <span>{name}</span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "100px",
        }}
      >
        <span>{name}</span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "100px",
        }}
      >
        <span>{cityname}</span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "50px",
        }}
      >
        <span>{khoroo}</span>
      </div>
      <div
        className={css.onename}
        style={{
          width: "100px",
        }}
      >
        <span>{props.item.address} </span>
      </div>
    </div>
  );
};

export default Shop;
