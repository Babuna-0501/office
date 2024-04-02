import React, { useState, useEffect } from "react";
import css from "./shopindex.module.css";
import closeicon from "../../../assets/close.svg";
import Zonesshops from "./Zonesshops";
import ChannelsShops from "./ChannelsShops";
import myHeaders from "../../../components/MyHeader/myHeader";

const data = [
  { id: 1, name: "Бүсчлэл" },
  { id: 2, name: "Суваг" },
];

const ShopIndex = (props) => {
  const [tab, setTab] = useState(0);
  const [shopData, setShopData] = useState([]);
  console.log("props", props);

  useEffect(() => {
    if (props.data.zones === null) {
      alert(
        "Та бүсчлэл ашиглан дэлгүүр сонгох бол , та эхлээд өөрийн бүсчлэлээ шалгана уу"
      );
    }
  }, [props.data]);
  useEffect(() => {
    let supid =
      props.data.supplier_id.replaceAll("|", "") == 1
        ? 13884
        : props.data.supplier_id.replaceAll("|", "");

    let url = `https://api2.ebazaar.mn/api/sfa/tradeshop/list?supplierId=${supid}`;
    console.log("url", url);
    fetch(url, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setShopData(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.closewrapper}>
          <div className={css.headercontainer}>
            Худалдааны төлөөлөгчид дэлгүүр сонгох
          </div>
          <img
            src={closeicon}
            alt="close"
            onClick={() => {
              props.setChosedOpen(false);
            }}
          />
        </div>
        <div className={css.tabcontainer}>
          {data.map((item, index) => {
            return (
              <div
                className={css.headercontainer}
                onClick={() => {
                  setTab(index);
                }}
                style={{
                  borderBottom:
                    tab === index ? "5px solid #2AB674" : "5px solid #F2F2F2",
                  width: "250px",
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div>
          {tab === 1 && <ChannelsShops data={props.data} shopData={shopData} />}
          {tab === 0 && <Zonesshops data={props.data} />}
        </div>
      </div>
    </div>
  );
};

export default ShopIndex;
