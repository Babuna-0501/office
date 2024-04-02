import React, { useState, useEffect, useContext } from "react";
import css from "./shopinfos.module.css";
import { styles } from "./style";
import Shop from "./Shop";
import LendHook from "../../Hooks/LendHook";
import myHeaders from "../../components/MyHeader/myHeader";
import Datadistrict from "../../District.json";
import Channel from "../Channel/Channel";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const ShopInfos = () => {
  const lendctx = useContext(LendHook);
  const [merchants, setMerchants] = useState([]);
  const [channelBus, setChannelBus] = useState(null);
  const [orderDistrict, setOrderDistrict] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [customName, setCustomName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [active, setActive] = useState([]);

  const businessChannelHandler = (item) => {
    setChannelBus(item);
  };

  useEffect(() => {
    setMerchants(lendctx.allDelguur);
  }, [lendctx.allDelguur]);

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div
          style={{ ...styles.checkboxcontainer }}
          className={css.headerwrapper}
        >
          <span>Бүсийн нэр</span>
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
        {merchants &&
          merchants.map((item, index) => {
            return (
              <Shop
                key={index}
                index={index}
                item={item}
                merchants={merchants}
                setMerchants={setMerchants}
                setAlldelguur={lendctx.setAllDelguur}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ShopInfos;
