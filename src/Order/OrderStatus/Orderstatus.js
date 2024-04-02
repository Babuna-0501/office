import React, { useEffect, useState, useContext } from "react";
import css from "./orderstatus.module.css";
import OrdersHook from "../../Hooks/OrdersHook";
import myHeaders from "../../components/MyHeader/myHeader";

const Orderstatus = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderStatusValue, setOrderStatusValue] = useState([]);

  const orderctx = useContext(OrdersHook);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api2.ebazaar.mn/api/order/status/list`, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        let statusIDS = [1, 2, 3, 5];
        let status = [];
        if (response.code === 200) {
          response.data.map((item) => {
            if (statusIDS.includes(item.OrderStatusID)) {
              status.push(item);
            }
          });
        }

        setOrderStatusValue(status);
      });
  }, []);
  useEffect(() => {
    // console.log("orderStatus++++++++-----+++++", orderStatus);
    orderctx.setOrderStatus(Number(orderStatus));
  }, [orderStatus]);

  return (
    <div className={css.container}>
      <select
        value={orderStatus}
        onChange={(e) => setOrderStatus(e.target.value)}
      >
        <option value="">Бүх статус</option>
        {orderStatusValue.map((s, index) => {
          return (
            <option key={index} value={s.OrderStatusID}>
              {s.Name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Orderstatus;
