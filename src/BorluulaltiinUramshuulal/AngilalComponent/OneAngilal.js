import React, { useRef, useState, useContext, useEffect } from "react";
import deleteicon from "../../assets/delete_red_small.svg";
import tugrugnogoon from "../../assets/tugrug.svg";
import tugrugsaaral from "../../assets/tugrug@2x.svg";
import css from "./angilalcomponent.module.css";
import SMSHook from "../../Hooks/SMSHook";
import PricePlan from "../Priceplan/PricePlan";

const OneAngilal = (props) => {
  const [totalAmount, setTotalAmount] = useState(null);
  const smsctx = useContext(SMSHook);
  const moneyRef = useRef();
  console.log("props.", props);
  const DeleteHandler = (item) => {
    let update = smsctx.Angilaldata.filter((x) => x.id !== item.id);

    smsctx.setAngilalData(update);
  };

  useEffect(() => {
    let update = smsctx.Angilaldata.filter((x) => x.id === props.item.id)[0]
      .totalAmount;
    setTotalAmount(update);
  }, [smsctx.Angilaldata]);
  return (
    <div
      className={css.onebrand}
      style={{
        display: props.supCategory.includes(props.item.id) ? "block" : "none",
      }}
    >
      <p
        style={{
          width: "200px",
        }}
      >
        {props.item.name}
      </p>
      <div className={css.inputwrapper}>
        <input
          ref={moneyRef}
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(e.target.value);

            let aa = [...smsctx.Angilaldata];
            aa.find((x) => x.id === props.item.id).totalAmount = Number(
              moneyRef.current.value ? moneyRef.current.value : 0
            );
            smsctx.setAngilalData(aa);
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

export default OneAngilal;
