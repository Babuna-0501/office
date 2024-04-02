import css from "./colaOrders.module.css";
import closeIcon from "../assets/shipment/closeIcon.svg";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/common";
import { colaOrderUsers } from "./Index";

const token =
  "eb_cola_integration_05f60b8248eb98591c10ce996eedff0831db539ebe913f6531551299730f4a024a4707e7510ee2e9915c9e8bb1d8c18b558c4f76c765e6e3628705262f85fc9a";

export const ColaOrders = ({ closeHandler, userData }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    if (!colaOrderUsers.includes(userData.id)) {
      closeHandler();
      return;
    }

    setCheckingUser(false);
  }, []);

  useEffect(() => {
    if (checkingUser) return;

    const getOrders = async () => {
      try {
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("eb_token", token);
        myHeaders.append("Content-Type", "application/json");

        const url = `https://api.ebazaar.mn/api/cola/order`;
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setOrders(resData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [checkingUser]);

  return (
    <div className={css.container}>
      <div className={css.headers}>
        <h1>MCS-Coca-Cola захиалга</h1>
        <button onClick={closeHandler}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>

      <div className={css.contentWrapper}>
        <div className={css.content}>
          <div className={css.contentHeader}>
            {/* DocumentNo */}
            <div className={css.singleHeader} style={{ width: 130 }}>
              Захиалгын дугаар
            </div>

            {/* CustomerID */}
            <div className={css.singleHeader} style={{ width: 130 }}>
              Хэрэглэгчийн код
            </div>

            {/* TradeshopID */}
            <div className={css.singleHeader} style={{ width: 100 }}>
              Цэгийн код
            </div>

            {/* Name */}
            <div className={css.singleHeader} style={{ width: 150 }}>
              Нэр
            </div>

            {/* Address */}
            <div className={css.singleHeader} style={{ width: 300 }}>
              Хаяг
            </div>

            {/* PaymentTermID */}
            <div className={css.singleHeader} style={{ width: 130 }}>
              Төлбөрийн нөхцөл
            </div>

            {/* Date Create */}
            <div className={css.singleHeader} style={{ width: 110 }}>
              Үүссэн өдөр
            </div>

            {/* DDate */}
            <div className={css.singleHeader} style={{ width: 110 }}>
              Хүргүүлэх өдөр
            </div>

            {/* Amount */}
            <div className={css.singleHeader} style={{ width: 110 }}>
              Нийт дүн
            </div>
          </div>

          {!loading && (
            <div className={css.mainContent}>
              {orders.map((order) => {
                return (
                  <SingleOrder
                    key={`cola-single-order-${order.DocumentNo}`}
                    order={order}
                  />
                );
              })}
            </div>
          )}

          {loading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SingleOrder = ({ order }) => {
  return (
    <div className={css.singleOrder}>
      {/* DocumentNo */}
      <div className={css.singleOrderItem} style={{ width: 130 }}>
        {order.DocumentNo}
      </div>

      {/* CustomerID */}
      <div className={css.singleOrderItem} style={{ width: 130 }}>
        {order.CustomerId}
      </div>

      {/* TradeshopID */}
      <div className={css.singleOrderItem} style={{ width: 100 }}>
        {order.TradeShopId}
      </div>

      {/* Name */}
      <div className={css.singleOrderItem} style={{ width: 150 }}>
        {order.Name[0]}
      </div>

      {/* Address */}
      <div className={css.singleOrderItem} style={{ width: 300 }}>
        {order.FullAddress}
      </div>

      {/* PaymentTermID */}
      <div className={css.singleOrderItem} style={{ width: 130 }}>
        {order.PaymentTermId}
      </div>

      {/* Date Create */}
      <div className={css.singleOrderItem} style={{ width: 110 }}>
        {order.DateCreate.split("T")[0]}
      </div>

      {/* DDate */}
      <div className={css.singleOrderItem} style={{ width: 110 }}>
        {order.DDate.split("T")[0]}
      </div>

      {/* Amount */}
      <div className={css.singleOrderItem} style={{ width: 110 }}>
        {order.Amount.toLocaleString()}₮
      </div>
    </div>
  );
};
