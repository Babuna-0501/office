import React, { useContext } from "react";

import classes from "./style.module.css";
import Ctx from "../../hooks/context";
import Product from "./Product";
import style from "../../style";
import clearIcon from "../../../assets/vectorclearIcon.svg";

const SideBar = () => {
  const { isSideBar, sideBarData, setIsSideBar } = useContext(Ctx);
  console.log("sidebarData", sideBarData);
  return (
    <div
      className={isSideBar ? classes.container : ""}
      onClick={() => setIsSideBar(false)}
    >
      <div className={isSideBar ? classes.unhide : classes.hide}>
        <div
          className={classes.header}
          onClick={() => {
            console.log(sideBarData.body?.stocks);
          }}
        >
          <h4>Header</h4>
        </div>
        <div className={classes.productList}>
          <div className={classes.productsHeader}>
            <h5 style={{ ...style.buteegdehuuniiNer }}>Бүтээгдэхүүний нэр</h5>
            <h5 style={{ ...style.tooShirheg }}>Т/Ш</h5>
            <h5 style={{ ...style.unitPrice }}>Үнэ</h5>
            <h5 style={{ ...style.totalAmount }}>Нийт</h5>
            <h5 style={{ ...style.Noat }}>Нөат</h5>
            <h5 style={{ ...style.Nhat }}>Нхат</h5>
          </div>
          <div className={classes.products}>
            {sideBarData.body?.stocks.map((e, index) => (
              <Product key={index} product={e} />
            ))}
          </div>
        </div>
        {sideBarData.barimt ? (
          !sideBarData.barimt?.success ? (
            <button onClick={() => alert("huselt ilgeegdlee")}>
              huselt ilgeeh
            </button>
          ) : null
        ) : null}
        <div className={classes.clearIcon} onClick={() => setIsSideBar(false)}>
          <img src={clearIcon} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
