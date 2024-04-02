import React, { useState, useRef, useEffect, useContext } from "react";
import css from "./brandcomponent.module.css";

import deleteicon from "../../assets/delete_red_small.svg";
import tugrugnogoon from "../../assets/tugrug.svg";
import tugrugsaaral from "../../assets/tugrug@2x.svg";
import PricePlan from "../Priceplan/PricePlan";
import SMSHook from "../../Hooks/SMSHook";

const OneItem = (props) => {
  const [totalAmount, setTotalAmount] = useState(null);
  const moneyRef = useRef();
  const smsctx = useContext(SMSHook);
  const DeleteHandler = (item) => {
    let update = smsctx.chosedBrands.filter((x) => x.BrandID !== item.BrandID);
    smsctx.setChosedBrands(update);
  };
  useEffect(() => {
    let update = smsctx.chosedBrands.filter(
      (x) => x.BrandID === props.item.BrandID
    )[0].totalAmount;
    setTotalAmount(update);
  }, [smsctx.chosedBrands]);
  return (
    <div className={css.onebrand}>
      <p className={css.imagewrapper}>
        <img
          src={
            props.item && props.item.Image
              ? props.item.Image
              : "https://ebazaar.mn/media/product/3972463217692126714577193090202305010152296735091923881782527978709705.png"
          }
        />
      </p>
      <p
        style={{
          width: "200px",
        }}
      >
        {props.item.BrandName}
      </p>
      <div className={css.inputwrapper}>
        <input
          ref={moneyRef}
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(e.target.value);
            let aa = [...smsctx.chosedBrands];
            console.log("aa", aa);

            aa.find((x) => x.BrandID === props.item.BrandID).totalAmount =
              Number(moneyRef.current.value ? moneyRef.current.value : 0);
            smsctx.setChosedBrands(aa);
          }}
          //   placeholder="0"
          // min={0}
          type="number"
          style={{
            width: "150px",
            background: totalAmount !== null ? "#F9FCF5" : "#fff",
            border:
              totalAmount !== null
                ? "0.8px solid #60A744"
                : "0.8px solid #CCCCCC",
          }}
          disabled={props.btnmodified}
        />
        <img
          src={totalAmount !== null ? tugrugnogoon : tugrugsaaral}
          className={css.imagetugrug}
        />
      </div>

      {props.btnmodified ? (
        <div>
          {" "}
          <PricePlan
            price={props.item.totalAmount}
            actionPrice={props.item.actionAmount}
          />
        </div>
      ) : (
        <img
          src={deleteicon}
          alt="red icon"
          style={{
            width: "20px",
            height: "20px",
          }}
          onClick={() => DeleteHandler(props.item)}
        />
      )}
    </div>
  );
};

export default OneItem;
