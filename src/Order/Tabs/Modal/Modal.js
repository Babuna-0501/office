import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import css from "./modal.module.css";
import homeShop from "../../../assets/homeDelguur.svg";
import Headerone from "../Headercomponents/Headerone";
import Braketterm from "../../BraketTerm/Braketterm";
import BankInfo from "../../BankInfo/BankInfo";

const Modal = (props) => {
  const [totalPriceBracket, setTotalPriceBracket] = useState(null);
  let aa = props.order;

  let total = 0;
  props.order.line.map((l) => {
    total += parseFloat(l.price.toFixed(2)) * l.quantity;
  });
console.log(props.order.order_data)
try {
  return (
    <Wrapper className={css.container}>
      <div className={css.headercontainer}>
        <div className={css.shopcontainer}>
          <div className={css.shoplogo}>
            <img src={homeShop} />
          </div>
          <div className={css.shopinfo}>
            <p className={css.shopname}>
              {props.order ? props.order.tradeshop_name : ""}
            </p>
            <p className={css.shopaddress}>
              {" "}
              {props.order ? props.order.address : ""}
            </p>
          </div>
        </div>
        <div>
          <div className={css.moneycontainer}>
            <p className={css.firstchild}>Захиалгын дүн:</p>

            <p
              className={css.secondchild}
              style={{
                textDecoration: totalPriceBracket ? "line-through" : "none",
              }}
            >
              {props.order ? total.toLocaleString() + "₮" : null}
            </p>
          </div>
          {JSON.parse(props.order?.order_data)?.prePayment ? (
            <div className={css.moneycontainer}>
              <p className={css.firstchild}>Урдчилсан төлөлт:</p>

              <p className={css.secondchild}>
                {props.order
                  ? Number(
                      JSON.parse(props.order.order_data).prePayment
                    ).toLocaleString() + "₮"
                  : null}
              </p>
            </div>
          ) : null}

          {totalPriceBracket ? (
            <div className={css.moneycontainer}>
              <p className={css.firstchild}>Хямдарсан дүн:</p>

              <p className={css.secondchild}>
                {props.order ? totalPriceBracket.toLocaleString() + "₮" : null}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div className={css.middlewrapper}></div>
      <div className={css.footerwrapper}>
        <div>
          <Headerone data={props.order} />
        </div>
      </div>
      {aa.order_data !== null && (
        <>
          {" "}
          <div className={css.divider}></div>
          <Braketterm data={aa} setTotalPriceBracket={setTotalPriceBracket} />
        </>
      )}
      {aa.order_data !== null && (
        <>
          {" "}
          {/* <div className={css.divider}></div> */}
          <BankInfo data={aa} />
        </>
      )}
    </Wrapper>
  );
} catch(e) {
  console.log('--------------------------------------------------------------------------------')
  console.log(e)
}
};

export default Modal;
