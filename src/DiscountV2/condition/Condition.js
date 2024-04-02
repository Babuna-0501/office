import React, { useState } from "react";
import css from "./condition.module.css";
const Condition = (props) => {
  const [price, setPrice] = useState(null);
  const [percent, setPercent] = useState(null);
  const CancelHandler = () => {
    setPercent(null);
    setPrice(null);
    props.setConditionShow(false);
  };
  const SaveHandler = () => {
    if (!price) {
      alert("Та үнэ оруулна уу..");
      return;
    }
    if (!percent) {
      alert("Та хувь оруулна уу..");
      return;
    }
    // console.log("price", price);
    // console.log("percent", percent);
    props.setDiscountCondition([
      ...props.discountCondition,
      {
        label: price,
        percent: percent,
      },
    ]);
    props.setConditionShow(false);

    setPercent(null);
    setPrice(null);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.inputcontainer}>
          <input
            placeholder="Үнийн дүн"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={css.inputcontainer}>
          <input
            placeholder="Хувь"
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
        <div className={css.btncontainer}>
          <button onClick={CancelHandler} className={css.cancelbtn}>
            Цуцлах
          </button>
          <button onClick={SaveHandler} className={css.okbtn}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Condition;
