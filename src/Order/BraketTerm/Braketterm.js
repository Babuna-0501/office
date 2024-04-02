import React, { useEffect, useState } from "react";
import css from "./bracketterm.module.css";

const Braketterm = (props) => {
  const [orderData, setOrderData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [orderLine, setOrderLine] = useState([]);
  const [newTotal, setNewTotal] = useState(null);
  const [secondTotal, setSecondTotal] = useState(null);
  // console.log("props braket", props.data);
  useEffect(() => {
    if (props.data.order_data !== null && props.data.order_data !== "") {
      setOrderData(JSON.parse(props.data.order_data));
    }
    setOrderLine(props.data.line);
  }, [props]);

  useEffect(() => {
    let niitPrice = 0;
    orderLine &&
      orderLine.map((item) => {
        niitPrice += parseFloat(item.price.toFixed(2)) * Number(item.quantity);
      });

    setTotalPrice(niitPrice);

    niitPrice = Number(niitPrice) * Number(1 - orderData?.term?.percent / 100);
    setNewTotal(niitPrice);
    if (niitPrice >= Number(orderData?.bracket?.Bracket)) {
      niitPrice = Number(niitPrice) * Number(orderData?.bracket.Value);
      setSecondTotal(niitPrice);
    }

    props.setTotalPriceBracket(niitPrice);
  }, [orderLine]);
  console.log("orderdata ++++++++++ brackert", orderData);

  return (
    <div className={css.container}>
      <div className={css.wrapperone}>
        <div className={css.title}>
          {orderData !== null && orderData?.term?.percent
            ? `${orderData?.term.PaymentTermName} : `
            : ""}
        </div>
        <div className={css.content}>
          {orderData?.term?.percent
            ? `$
          {(totalPrice - newTotal).toLocaleString()}₮`
            : ""}
        </div>
      </div>
      <div className={css.wrapperone}>
        <div className={css.title}>
          {orderData !== null && orderData?.bracket
            ? `${orderData?.bracket.Name} :`
            : ""}
        </div>
        <div className={css.content}>
          {" "}
          {orderData !== null && orderData?.bracket
            ? `${(
                totalPrice -
                (totalPrice - newTotal) -
                secondTotal
              ).toLocaleString()}₮`
            : ""}
        </div>
      </div>
    </div>
  );
};
// orderData?.bracket.Value
export default Braketterm;
