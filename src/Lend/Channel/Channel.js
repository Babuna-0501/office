import React, { useContext, useEffect, useState } from "react";
import css from "./channel.module.css";
import ProductReportHook from "../../Hooks/ProductsReportHook";
const Channel = (props) => {
  const [channel, setChannel] = useState(null);
  const [channelvalue, setChannelvalue] = useState(null);
  const sitedatactx = useContext(ProductReportHook);
  useEffect(() => {
    // console.log("siteddataaaa ", sitedatactx.sitedata.business_types);
    let option = [];
    sitedatactx.sitedata.business_types.map((item) => {
      option.push({
        id: item.business_type_id,
        value: item.business_type_name,
      });
    });
    setChannel(option);
  }, []);
  const clickHandler = (e) => {
    setChannelvalue(e.target.value);
    props.onClick(e.target.value);
  };
  // console.log("channel", channel);

  return (
    <select value={channelvalue} onChange={clickHandler}>
      <option value="all">---</option>
      {channel
        ? channel.map((s, index) => {
            return (
              <option value={s.id} key={index}>
                {s.value}
              </option>
            );
          })
        : null}
    </select>
  );
};

export default Channel;
