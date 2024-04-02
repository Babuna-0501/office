import React, { useState, useContext } from "react";
import css from "./discounmodal.module.css";
import closeBtn from "../assets/close_white.svg";
import discountIcon from "../assets/Discount_orange.svg";
import checkBoxIcon from "../assets/check box.svg";
import checkedBoxIcon from "../assets/Tick Square on_discount.svg";
import PromoHook from "../Hooks/PromoHook";
import discount from "./discount.json";

const DiscountModal = () => {
  const [active, setActive] = useState(null);
  const ctx = useContext(PromoHook);
  const selectHandler = (item, index) => {
    setActive(index);
    // console.log("item", item);
    ctx.setDiscountTypeSelect(item);
  };
  const selectedHandler = () => {
    if (active === null) {
      alert("Та хямдарлын төрөлөө сонгоно уу.");
      return;
    }
    ctx.setSettingActive(null);
    ctx.setNewPromoAdd(false);
    ctx.setNextPage(true);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.closeWrapper}>
          <img
            src={closeBtn}
            alt="close icon"
            onClick={() => {
              ctx.setNewPromoAdd(false);
              ctx.setNextPage(false);
            }}
          />
        </div>
        <div className={css.infoWrapper}>
          <div className={css.iconWrapper}>
            <img src={discountIcon} alt="discount icon" />
          </div>
          <div className={css.headerWrapper}>
            <p className={css.headerH1}>Урамшуулал, хямдралын төрөл сонгох</p>
          </div>
          <div>
            {discount.map((item, index) => {
              return (
                <div
                  key={index}
                  className={css.discountWrapper}
                  onClick={() => selectHandler(item, index)}
                  style={{
                    background: index === active ? "#B0BEC5" : "#ECEFF1",
                  }}
                >
                  <img src={index === active ? checkedBoxIcon : checkBoxIcon} />{" "}
                  <span
                    style={{
                      color: index === active ? "#FFFFFF" : "#78909C",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={css.discountBtnWrapper}>
            <button onClick={selectedHandler}>Шинээр нээх</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
