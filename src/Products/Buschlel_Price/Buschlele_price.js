import React from "react";
import css from "./buschlel_price.module.css";
import { data } from "./data";

const Buschlele_price = () => {
  return (
    <div className="row header">
      {data.map((item, index) => {
        <div style={{ width: `${item.width}` }} key={index}>
          <div>
            <span className="header">{item.name}</span>
            <input type="text" />
          </div>
        </div>;
      })}
    </div>
  );
};

export default Buschlele_price;
