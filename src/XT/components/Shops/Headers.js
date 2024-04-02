import React, { useContext, useState } from "react";
import css from "./headers.module.css";
import ProductReportHook from "../../../Hooks/ProductsReportHook";
import { useEffect } from "react";
import checkedsvg from "../../../assets/Tick Square on 2.svg";
import uncheckedsvg from "../../../assets/Tick Square.svg";
import { data } from "./Headerdatas";

const Headers = () => {
  const [channel, setChannel] = useState(0);
  const [channelData, setChannelData] = useState([]);
  const [channelIDS, setChannelIDS] = useState([
    1, 2, 3, 4, 5, 23, 24, 25, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 22, 21,
  ]);
  const [channelOpen, setChannelOpen] = useState(false);
  const sitectx = useContext(ProductReportHook);

  useEffect(() => {
    let ids = [];
    sitectx.sitedata && setChannelData(sitectx.sitedata.business_types);
    sitectx.sitedata &&
      sitectx.sitedata.business_types.map((item) => {
        ids.push(item.business_type_id);
      });

    if (channelIDS.length === 0) {
      console.log("cahnne orll");
      setChannelIDS(ids);
    }
  }, [sitectx.sitedata]);
  console.log("channelIDS", channelIDS);
  const ChosedHandler = (e, item) => {
    e.stopPropagation();
    console.log("item", item);
    if (channelIDS.includes(item.business_type_id)) {
      let update = channelIDS.filter((x) => x !== item.business_type_id);
      console.log("update", update);

      setChannelIDS([...update]);
    } else {
      console.log("clicked");
      setChannelIDS((prev) => [...prev, item.business_type_id]);
    }
  };
  return (
    <div className={css.container}>
      {data.map((item, i) => {
        return (
          <div
            className={css.wrapper}
            style={{
              width: item.width,
            }}
          >
            <span>{item.name}</span>
            {i === 2 ? (
              <div
                style={{
                  position: "relative",
                  border: "1px solid #cccccc",
                  height: "20px",
                  borderRadius: "4px",
                }}
                onClick={(e) => {
                  setChannelOpen((prev) => !prev);
                }}
              >
                {channelOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    className={css.channelcontainer}
                  >
                    <div className={css.channelwrapper}>
                      {sitectx.sitedata &&
                        sitectx.sitedata.business_types.map((item, index) => {
                          // console.log("item", item);
                          return (
                            <div
                              key={index}
                              className={css.option}
                              onClick={(e) => ChosedHandler(e, item)}
                            >
                              <img
                                src={
                                  channelIDS.includes(item.business_type_id)
                                    ? checkedsvg
                                    : uncheckedsvg
                                }
                              />
                              <span>{item.business_type_name}</span>
                            </div>
                          );
                        })}
                    </div>
                    <button>Хадгалах</button>
                  </div>
                )}
              </div>
            ) : (
              <input />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Headers;
