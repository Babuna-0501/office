// CSS
import { useState } from "react";
import css from "./orderFooter.module.css";
import { useEffect } from "react";

export const OrderFooter = ({ zIndex, orders, currentPage }) => {
  const [pendingOrders] = useState(
    orders.filter((order) => order.status === 1)
  );
  const [confirmedOrders] = useState(
    orders.filter((order) => order.status === 2)
  );
  const [deliveredOrders] = useState(
    orders.filter((order) => order.status === 3)
  );
  const [cancelledOrders] = useState(
    orders.filter((order) => order.status === 5)
  );

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPendingPrice, setTotalPendingPrice] = useState(0);
  const [totalConfirmedPrice, setTotalConfirmedPrice] = useState(0);
  const [totalDeliveredPrice, setTotalDeliveredPrice] = useState(0);
  const [totalCancelledPrice, setTotalCancelledPrice] = useState(0);

  useEffect(() => {
    let totalPriceCopy = 0;
    let totalPendingPriceCopy = 0;
    let totalConfirmedPriceCopy = 0;
    let totalDeliveredPriceCopy = 0;
    let totalCancelledPriceCopy = 0;

    for (const order of orders) {
      for (const product of order.line) {
        const productPrice = product.price * product.quantity;
        totalPriceCopy += productPrice;
        if (order.status === 1) totalPendingPriceCopy += productPrice;
        if (order.status === 2) totalConfirmedPriceCopy += productPrice;
        if (order.status === 3) totalDeliveredPriceCopy += productPrice;
        if (order.status === 5) totalCancelledPriceCopy += productPrice;
      }
    }

    setTotalPrice(totalPriceCopy);
    setTotalPendingPrice(totalPendingPriceCopy);
    setTotalConfirmedPrice(totalConfirmedPriceCopy);
    setTotalDeliveredPrice(totalDeliveredPriceCopy);
    setTotalCancelledPrice(totalCancelledPriceCopy);
  }, [currentPage, orders]);

  return (
    <div className={css.footerContainer} style={{ zIndex }}>
      <div className={css.footerStatsContainer}>
        <div className={css.normalCard}>
          <span>Нийт захиалгын тоо:</span>
          <p>{orders.length}ш</p>
        </div>

        <div className={css.normalCard}>
          <span>Нийт мөнгөн дүн:</span>
          <p>{totalPrice.toLocaleString()}₮</p>
        </div>

        <div className={`${css.countCard} ${css.total}`}>
          <div className={css.countWrapper}>
            <span>{confirmedOrders.length + deliveredOrders.length}ш</span>
          </div>

          <div className={css.separator} />

          <div className={css.stat}>
            <span>Нийт төлбөр төлөлт:</span>
            <p>
              {(totalConfirmedPrice + totalDeliveredPrice).toLocaleString()}₮
            </p>
          </div>
        </div>

        <div className={`${css.countCard} ${css.pending}`}>
          <div className={css.countWrapper}>
            <span>{pendingOrders.length}ш</span>
          </div>

          <div className={css.separator} />

          <div className={css.stat}>
            <span>Хүлээгдэж буй:</span>
            <p>{totalPendingPrice.toLocaleString()}₮</p>
          </div>
        </div>

        <div className={`${css.countCard} ${css.confirmed}`}>
          <div className={css.countWrapper}>
            <span>{confirmedOrders.length}ш</span>
          </div>

          <div className={css.separator} />

          <div className={css.stat}>
            <span>Баталгаажсан:</span>
            <p>{totalConfirmedPrice.toLocaleString()}₮</p>
          </div>
        </div>

        <div className={`${css.countCard} ${css.delivered}`}>
          <div className={css.countWrapper}>
            <span>{deliveredOrders.length}ш</span>
          </div>

          <div className={css.separator} />

          <div className={css.stat}>
            <span>Хүргэгдсэн:</span>
            <p>{totalDeliveredPrice.toLocaleString()}₮</p>
          </div>
        </div>

        <div className={`${css.countCard} ${css.cancelled}`}>
          <div className={css.countWrapper}>
            <span>{cancelledOrders.length}ш</span>
          </div>

          <div className={css.separator} />

          <div className={css.stat}>
            <span>Цуцлагдсан:</span>
            <p>{totalCancelledPrice.toLocaleString()}₮</p>
          </div>
        </div>
      </div>

      <p className={css.page}>
        Хуудас: <span>{currentPage + 1}</span>
      </p>
    </div>
  );
};
