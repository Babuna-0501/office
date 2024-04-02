import React, { useContext, useState } from "react";
import css from "./header.module.css";
import OkIcon from "../../assets/OK.svg";
import PromoHook from "../../Hooks/PromoHook";

const Headercomponent = (props) => {
  const [discountModal, setDiscountModal] = useState(false);

  const promoctx = useContext(PromoHook);
  const chooseDiscountTypeHandler = () => {
    setDiscountModal(!discountModal);
  };
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3>Урамшуулал, хямдралын төрөл</h3>
      </div>
      <div className={css.titleContainer}>
        <div className={css.titlewrapper}>
          <input
            placeholder="Гарчиг"
            value={props.titlevalue}
            onChange={(e) => props.title(e.target.value)}
            className={css.titleConInput}
            style={{
              height: "52px",
              padding: "16px 20px",
              fontSize: "16px",
              fontWeight: "400",
              color: "#37474F",
            }}
          />
        </div>
        <div
          className={css.selectContainer}
          onClick={chooseDiscountTypeHandler}
        >
          <div className={css.chosedContainer}>
            <img src={OkIcon} />{" "}
            <span>{promoctx?.discountTypeSelect.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headercomponent;
