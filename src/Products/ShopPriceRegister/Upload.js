import React, { useState, useEffect, useContext } from "react";
import css from "./upload.module.css";
import ProductOne from "./ProductOne";
import { styles } from "./style";
import checkbox from "../../assets/check box.svg";
import checked from "../../assets/Tick Square_green.svg";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const Upload = (props) => {
  const prodctx = useContext(ProductReportHook);
  console.log("prodctx", prodctx);

  return (
    <div className={css.container}>
      <div>
        <div className={css.header}>
          <div
            style={{
              width: "20px",
            }}
            className={css.first}
          >
            <img
              src={checked}
              alt="checked"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
          <div
            style={{
              ...styles.first,
            }}
            className={css.first}
          >
            <span>Барааны нэр</span>
            <input
              style={{
                ...styles.first,
              }}
            />
          </div>
          <div
            style={{
              ...styles.second,
            }}
            className={css.first}
          >
            <span>Barcode</span>
            <input
              style={{
                ...styles.second,
              }}
            />
          </div>
          <div
            style={{
              ...styles.third,
            }}
            className={css.first}
          >
            <span>SKU</span>
            <input
              style={{
                ...styles.third,
              }}
            />
          </div>
          <div
            style={{
              ...styles.fourth,
            }}
            className={css.first}
          >
            <span>Price</span>
            <input
              style={{
                ...styles.fourth,
              }}
            />
          </div>
        </div>
        <div className={css.body}>
          {prodctx.importData &&
            prodctx.importData?.map((item, index) => {
              return <ProductOne item={item} key={index} />;
            })}
        </div>
      </div>
      <div
        style={{
          fontSize: "10px",
        }}
      >
        Урт :{prodctx.importData ? prodctx.importData?.length : "0"}
      </div>

      <div className={css.btnwrapper}>
        <button
          style={{
            background: "#ECEFF1",
            color: "#78909C",
          }}
          onClick={() => {
            props.setPage(1);
          }}
        >
          Цуцлах
        </button>
        <button
          style={{
            background: "#ffa600",
            color: "#fff",
          }}
          onClick={() => {
            props.setPage(1);
          }}
        >
          Хадгалах
        </button>
      </div>
    </div>
  );
};

export default Upload;
