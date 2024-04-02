import React, { useState, useEffect } from "react";
import Headers from "./Headers";
import css from "./channelsshops.module.css";
import { data } from "./Headerdatas";

const ChannelsShops = ({ data, shopData }) => {
  const [widthdata, setWidthdata] = useState([]);

  useEffect(() => {
    let update = shopData.map((item) => {
      return Object.values(item);
    });
    console.log("update", update);
  }, [shopData]);
  return (
    <div>
      <Headers />
      <div className={css.body}></div>
    </div>
  );
};

export default ChannelsShops;
