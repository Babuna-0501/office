import React from "react";
import Headers from "./Headers";
import css from "./zonesshops.module.css";
const Zonesshops = ({ data }) => {
  return (
    <div className={css.container}>
      <Headers />
      <div>
        {data.zones === null && (
          <span>Дэлгүүрийн мэдээлэл байхгүй, та бүсчлэл хувиарилж авна уу</span>
        )}
      </div>
    </div>
  );
};

export default Zonesshops;
