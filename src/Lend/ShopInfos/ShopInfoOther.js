import React, { useState, useEffect, useContext } from "react";
import css from "./shopinfos.module.css";
import { styles } from "./style";
import ShopOther from "./ShopOther";
import LendHook from "../../Hooks/LendHook";
import Datadistrict from "../../District.json";
import Channel from "../Channel/Channel";

const ShopInfoOther = (props) => {
  const lendctx = useContext(LendHook);
  const [merchants, setMerchants] = useState([]);
  const [channelBus, setChannelBus] = useState(null);
  const [orderDistrict, setOrderDistrict] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [customName, setCustomName] = useState(null);
  const [allShops, setAllShops] = useState([]);
  const [leasingData, setLeasingData] = useState([]);

  const businessChannelHandler = (item) => {
    setChannelBus(item);
  };

  useEffect(() => {
    if (lendctx.worker.leasing !== null) {
      // console.log("lendctx.worker  +++11112222 ", lendctx.worker);
      setLeasingData(lendctx.worker.leasing);
    }
  }, [lendctx.worker]);
  useEffect(() => {
    setMerchants(lendctx.allDelguur);
  }, [lendctx.allDelguur]);
  // console.log("props.tradeshopsInfo", props.tradeshopsInfo);

  useEffect(() => {
    let data_one = props.tradeshopsInfo;

    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    }

    const arr1 = getUniqueListBy(data_one, "_id");
    data_one = arr1.sort(function (a, b) {
      return a.total_amount - b.total_amount;
    });
    data_one = data_one.reverse();

    setAllShops(data_one);
  }, [props.tradeshopsInfo]);
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div
          style={{ ...styles.checkboxcontainer }}
          className={css.headerwrapper}
        >
          <span>Бүсийн нэр other</span>
          <input
            onChange={(e) => setCustomName(e.target.value)}
            value={customName}
          />
        </div>
        <div
          style={{ ...styles.checkboxcontainer }}
          className={css.headerwrapper}
        >
          <span>Ү.цэгийн нэр</span>
          <input
            onChange={(e) => setCustomName(e.target.value)}
            value={customName}
          />
        </div>
        <div
          style={{ ...styles.channelContainer }}
          className={css.headerwrapper}
        >
          <span>Суваг</span>
          <input disabled />
        </div>
        <div
          style={{
            ...styles.workContainer,
          }}
          className={css.headerwrapper}
        >
          <span>Ү.ажилгааны чиглэл</span>

          <Channel onClick={businessChannelHandler} />
        </div>
        <div
          style={{
            ...styles.companyContainer,
          }}
          className={css.headerwrapper}
        >
          <span>Байгууллагын нэр</span>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        <div
          style={{
            ...styles.districtContainer,
          }}
          className={css.headerwrapper}
        >
          <span>Дүүрэг/Сум</span>
          <select
            value={orderDistrict}
            onChange={(e) => setOrderDistrict(e.target.value)}
          >
            <option value=""></option>
            {Datadistrict.map((s, index) => {
              return (
                <option value={s.id} key={index}>
                  {s.name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          style={{
            ...styles.khorooContainer,
          }}
          className={css.headerwrapper}
        >
          <span>Хороо</span>
          <input />
        </div>
        <div
          style={{
            ...styles.addressContainer,
          }}
          className={css.headerwrapper}
        >
          <span>Хаягын дэлгэрэнгүй</span>
          <input
            disabled
            style={{
              visibility: "hidden",
            }}
          />
        </div>
        <div
          style={{
            ...styles.lendContainer,
          }}
          className={`${css.headerwrapper} ${css.lendwrapper}`}
        >
          <span>Зээлийн </span>
          <span>тохиргоо</span>
          <input
            disabled
            style={{
              visibility: "hidden",
            }}
          />
        </div>
      </div>
      <div className={css.shopwrapper}>
        {allShops
          ? allShops.map((item, index) => {
              return (
                <ShopOther
                  key={index}
                  index={index}
                  item={item}
                  merchants={merchants}
                  setMerchants={setMerchants}
                  setAlldelguur={lendctx.setAllDelguur}
                  props={props}
                  // data={props.tradeshopsInfo}
                  setAllShops={setAllShops}
                  allShops={allShops}
                  leasingData={leasingData}
                  setStartDate={props.setStartDate}
                  setEndDate={props.setEndDate}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ShopInfoOther;
