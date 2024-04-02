import React, { useState, useContext, useEffect } from "react";
import css from "./shop.module.css";
import { styles } from "./style";
import LendHook from "../../Hooks/LendHook";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const Shop = ({ index, item, merchants, setMerchants, setAlldelguur }) => {
  // console.log("item update", item);
  const lendctx = useContext(LendHook);
  const sitedatactx = useContext(ProductReportHook);
  const [leas, setLeas] = useState(null);
  const [districtname, setDistrictname] = useState(null);
  const [busType, setBusType] = useState(null);

  const stateHandler = (e) => {
    setLeas(e.target.value);
  };

  useEffect(() => {
    setLeas(item.total_amount);
  }, [item]);

  let businesType =
    sitedatactx.sitedata.business_types[`${item.t_business_type}`];

  useEffect(() => {
    sitedatactx.sitedata.location.map((x) => {
      if (Number(x.location_id) === Number(item.t_disctrict)) {
        setDistrictname(x.location_name);
        return;
      }
      return;
    });
  }, [item]);
  useEffect(() => {
    sitedatactx.sitedata.business_types.map((x) => {
      if (Number(x.business_type_id) === Number(item.t_business_type)) {
        setBusType(x.business_type_name);
        return;
      }
      return;
    });
  }, [item]);
  useEffect(() => {
    if (lendctx.allDelguur) {
      let id = item.c_id + "";
      let data = [];

      lendctx.allDelguur.map((x) => {
        if (x.shopID === id) {
          if (x.total_amount) {
            data.push({
              zone_id: x.zone_id,
              zone_name: x.zone_name,
              tradeshop_id: x.t_id,
              value: Number(x.total_amount),
            });
          }
        }
      });

      lendctx.setShopLeasing((prev) => [...prev, ...data]);
    }
  }, [item]);

  let khoroo = sitedatactx.sitedata.location[item.t_khoroo];
  // console.log("khoroo", khoroo);
  return (
    <div className={css.container}>
      <div
        style={{ ...styles.checkboxcontainer }}
        className={css.headerwrapper}
      >
        <span>{item.zone_name ? item.zone_name : "MGL"}</span>
      </div>
      <div
        style={{ ...styles.checkboxcontainer }}
        className={css.headerwrapper}
      >
        {/* <span>{item.u_first_name}</span> */}
        <span>{item.t_id}</span>
      </div>
      <div style={{ ...styles.channelContainer }} className={css.headerwrapper}>
        <span>{businesType?.channel_name}</span>
      </div>
      <div
        style={{
          ...styles.workContainer,
        }}
        className={css.headerwrapper}
      >
        <span>{busType}</span>
      </div>
      <div
        style={{
          ...styles.companyContainer,
        }}
        className={css.headerwrapper}
      >
        <span>{item.c_ANname}</span>
      </div>
      <div
        style={{
          ...styles.districtContainer,
        }}
        className={css.headerwrapper}
      >
        <span>{districtname ? districtname : ""}</span>
      </div>
      <div
        style={{
          ...styles.khorooContainer,
        }}
        className={css.headerwrapper}
      >
        <span>{khoroo?.location_name ? khoroo?.location_name : ""}</span>
      </div>
      <div
        style={{
          ...styles.addressContainer,
        }}
        className={`${css.headerwrapper} ${css.addressFull}`}
        title={item.address}
      >
        <span>{item.t_address1}</span>
      </div>
      <div
        style={{
          ...styles.lendContainer,
        }}
        className={`${css.headerwrapper} ${css.headerInput}`}
      >
        <input
          value={item.total_amount}
          placeholder="0₮"
          min={0}
          onChange={(e) => {
            let newArr = [...merchants];
            newArr.find((x) => x.id === item.id).total_amount = e.target.value;
            setMerchants(newArr);
            setAlldelguur(newArr);
          }}
        />
      </div>
    </div>
  );
};

export default Shop;
