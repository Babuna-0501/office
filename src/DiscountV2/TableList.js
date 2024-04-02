import React from "react";
import css from "./tablelist.module.css";
import checkBoxIcon from "../assets/check box.svg";

const TableList = (props) => {
  // console.log("props", props);
  let content =
    props?.data &&
    props?.data?.map((item, index) => {
      let imageOne = item.image.split(",")[0];
      return (
        <div className={css.wrapper} key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "114px",
              paddingLeft: "12.5px",
            }}
          >
            <div>
              <img src={checkBoxIcon} className={css.image} />
            </div>
            <div className={css.idContainer}>
              <span>{item.id}</span>
            </div>
          </div>
          <div style={{ width: "66px", height: "57px" }}>
            <img
              src={imageOne}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className={css.nameContainer} style={{ width: "156px" }}>
            <span style={{ marginLeft: "10px" }}>{item.name}</span>
          </div>
          <div className={css.brandContainer} style={{ width: "146px" }}>
            <span style={{ marginLeft: "10px" }}>{item.categoryName}</span>
          </div>
          <div className={css.priceContainer} style={{ width: "100px" }}>
            <span style={{ marginLeft: "10px" }}>
              {item.price.toLocaleString() + "₮"}
            </span>
          </div>
          <div className={css.skuContainer} style={{ width: "80px" }}>
            <span style={{ marginLeft: "2px" }}>{item.sku}</span>
          </div>
          <div className={css.bar_codeContainer} style={{ width: "105px" }}>
            <span style={{ marginLeft: "2px" }}>{item.bar_code}</span>
          </div>
          <div className={css.stockContainer} style={{ width: "71px" }}>
            <span style={{ marginLeft: "2px" }}>
              {item.stock.toLocaleString()}
            </span>
          </div>
        </div>
      );
    });
  // console.log("content", content);
  return <div className={css.container}>{content}</div>;
};

export default TableList;
