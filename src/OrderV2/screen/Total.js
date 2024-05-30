import React, { useState, useEffect } from "react";
import "./style.css";
import getColorForStatus from "../components/color";

const Total = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [totalCancelPaymentAmount, setTotalCancelPaymentAmount] = useState(0);
  const [totalDeliveryPayment, setTotalDeliveryPayment] = useState(0);
  const [totalShipped, setTotalShipped] = useState(0);

  const [
    totalGrandTotalForConfirmedOrders,
    setTotalGrandTotalForConfirmedOrders,
  ] = useState(0);
  const [
    totalGrandTotalForDeliveredOrders,
    setTotalGrandTotalForDeliveredOrders,
  ] = useState(0);
  const [
    totalGrandTotalForCanceledOrders,
    setTotalGrandTotalForCanceledOrders,
  ] = useState(0);
  const [totalGrandTotalForPendingOrders, setTotalGrandTotalForPendingOrders] =
    useState(0);
  const [totalGrandTotalForDelayedOrders, setTotalGrandTotalForDelayedOrders] =
    useState(0);
  const [totalGrandTotalForLoadedOrders, setTotalGrandTotalForLoadedOrders] =
    useState(0);
  const [confirmedOrdersCount, setconfirmedOrdersCount] = useState(0);
  const [canceledOrdersCount, setCanceledOrdersCount] = useState(0);
  const [loadedOrdersCount, setLoadedOrdersCount] = useState(0);
  const [delayedOrdersCount, setDelayedOrdersCount] = useState(0);
  const [deliveredOrdersCount, setdeliveredOrdersCount] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [totalGrandTotalForShippedOrders, setTotalGrandTotalForShippedOrders] =
    useState(0);
  const [shippedOrdersCount, setShippedOrdersCount] = useState(0);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      // Нийт мөнгөн дүн
      let totalGrandTotal = props.data.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalPrice(totalGrandTotal);

      // Нийт төлбөр төлөлт
      let totalPaymentAmount = props.data.reduce(
        (acc, curr) => acc + curr.payment_amount,
        0
      );
      setTotalPaymentAmount(totalPaymentAmount);
      // Баталгаажсан
      const confirmedOrders = props.data.filter(
        (order) =>
          getColorForStatus(
            order.status,
            order.ShipmentStatus,
            order.ShipmentStatus
          )?.name === "Баталгаажсан"
      );
      const totalGrandTotalForConfirmed = confirmedOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalGrandTotalForConfirmedOrders(totalGrandTotalForConfirmed);
      setconfirmedOrdersCount(confirmedOrders.length);

      // Хүргэгдсэн

      const deliveredOrders = props.data.filter(
        (order) =>
          getColorForStatus(order.status, order.ShipmentStatus)?.name ===
          "Хүргэгдсэн"
      );
      const totalGrandTotalForDelivered = deliveredOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      const prePayment = deliveredOrders.map((d) =>
        d.order_data
          ? isNaN(parseInt(JSON.parse(d.order_data).prePayment))
            ? 0
            : parseInt(JSON.parse(d.order_data).prePayment)
          : 0
      );
      setTotalGrandTotalForDeliveredOrders(
        totalGrandTotalForDelivered -
          prePayment.reduce((acc, curr) => acc + curr, 0)
      );
      setdeliveredOrdersCount(deliveredOrders.length);

      // Хүргэлтийн төлбөр
      let totalDelivery = deliveredOrders.length * 6000;
      setTotalDeliveryPayment(totalDelivery);

      // Цуцлагдсан
      const canceledOrders = props.data.filter(
        (order) =>
          getColorForStatus(order.status, order.ShipmentStatus)?.name ===
          "Цуцлагдсан"
      );
      const totalGrandTotalForCanceled = canceledOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalGrandTotalForCanceledOrders(totalGrandTotalForCanceled);
      setCanceledOrdersCount(canceledOrders.length);

      // Хүлээгдэж буй
      const pendingOrders = props.data.filter(
        (order) =>
          getColorForStatus(order.status, order.ShipmentStatus)?.name ===
          "Хүлээгдэж буй"
      );
      const totalGrandTotalForPending = pendingOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalGrandTotalForPendingOrders(totalGrandTotalForPending);
      setPendingOrdersCount(pendingOrders.length);
      // ачигдсан
      const loadedOrders = props.data.filter(
        (order) =>
          getColorForStatus(order.status, order.ShipmentStatus)?.sname ===
          "Ачигдсан"
      );
      console.log(loadedOrders);
      const totalGrandTotalForLoaded = loadedOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalGrandTotalForLoadedOrders(totalGrandTotalForLoaded);
      setLoadedOrdersCount(loadedOrders.length);
      // хойшилсон

      const delayedOrders = props.data.filter(
        (order) =>
          getColorForStatus(order.status, order.ShipmentStatus)?.sname ===
          "Хойшилсон"
      );
      const totalGrandTotalForDelayed = delayedOrders.reduce(
        (acc, curr) => acc + curr.grand_total,
        0
      );
      setTotalGrandTotalForDelayedOrders(totalGrandTotalForDelayed);
      setDelayedOrdersCount(delayedOrders.length);
    }
  }, [props.data]);

  let aaa = totalPrice?.toLocaleString();
  let bbb = totalPaymentAmount?.toLocaleString();
  let ddd = totalDeliveryPayment?.toLocaleString();
  let totalGrandTotalForConfirmedOrdersFormatted =
    totalGrandTotalForConfirmedOrders?.toLocaleString();
  let totalGrandTotalForDeliveredOrdersFormatted =
    totalGrandTotalForDeliveredOrders?.toLocaleString();
  let totalGrandTotalForCanceledOrdersFormatted =
    totalGrandTotalForCanceledOrders?.toLocaleString();
  let totalGrandTotalForLoadedOrdersFormatted =
    totalGrandTotalForLoadedOrders?.toLocaleString();
  let totalGrandTotalForDelayedOrdersFormatted =
    totalGrandTotalForDelayedOrders?.toLocaleString();
  let totalGrandTotalForPendingOrdersFormatted =
    totalGrandTotalForPendingOrders?.toLocaleString();
  let canceledCount = canceledOrdersCount.toLocaleString();
  let loadedCount = loadedOrdersCount.toLocaleString();
  let delayedCount = delayedOrdersCount.toLocaleString();
  let confirmedCount = confirmedOrdersCount.toLocaleString();
  let deliveredCount = deliveredOrdersCount.toLocaleString();
  let pendingCount = pendingOrdersCount.toLocaleString();

  return (
    <div className="container-2">
      <div className="wrapper">
        <div className="footerspan">Нийт захиалгын тоо: </div>
        <span className="footerspantww">{props.data?.length ?? 0}ш</span>
      </div>
      <div className="wrapper">
        <div className="footerspan">Нийт мөнгөн дүн :</div>
        <span className="footerspantww">{aaa}₮</span>
      </div>
      <div
        className="wrapper"
        style={{ border: "1px solid #8DC543", width: "184px" }}
      >
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div
            className="firswrapper"
            style={{ background: "#8DC543", width: "90px" }}
          >
            <span style={{ color: "#fff" }}>{totalPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ whiteSpace: "nowrap" }}>Нийт төлбөр төлөлт:</span>
            <span>{bbb}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#F2F2F2" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }}>{pendingCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#000" }}>Хүлээгдэж буй:</span>
            <span>{totalGrandTotalForPendingOrdersFormatted}₮</span>
          </div>
        </div>
      </div>

      <div className="wrapper" style={{ background: "#00ADD0" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }}>{confirmedCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#fff" }}>Баталгаажсан:</span>
            <span style={{ color: "#fff" }}>
              {totalGrandTotalForConfirmedOrdersFormatted}₮
            </span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#76CC33" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }}>{deliveredCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#fff" }}>Хүргэгдсэн:</span>
            <span style={{ color: "#fff" }}>
              {totalGrandTotalForDeliveredOrdersFormatted}₮
            </span>
          </div>
        </div>
      </div>

      {props.userData.company_id === "|14268|" && (
        <>
          <div className="wrapper" style={{ background: "#E3CE0E" }}>
            <div style={{ color: "#90A4AE" }} className="statuscontainer">
              <div className="firswrapper" style={{ background: "#fff" }}>
                <span style={{ color: "#000" }}>{loadedCount}ш</span>
              </div>
              <div className="secondwrapper">
                <span style={{ color: "#fff" }}>Ачигдсан:</span>
                <span style={{ color: "#fff" }}>
                  {totalGrandTotalForLoadedOrdersFormatted}₮
                </span>
              </div>
            </div>
          </div>
          <div className="wrapper" style={{ background: "#ccc" }}>
            <div style={{ color: "#90A4AE" }} className="statuscontainer">
              <div className="firswrapper" style={{ background: "#fff" }}>
                <span style={{ color: "#000" }}>{delayedCount}ш</span>
              </div>
              <div className="secondwrapper">
                <span style={{ color: "#fff" }}>Хойшилсон:</span>
                <span style={{ color: "#fff" }}>
                  {totalGrandTotalForDelayedOrdersFormatted}₮
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="wrapper" style={{ background: "#EB5E43" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }}>{canceledCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#fff" }}>Цуцлагдсан:</span>
            <span style={{ color: "#fff" }}>
              {totalGrandTotalForCanceledOrdersFormatted}₮
            </span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#fff" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#8DC543" }}>
            <span style={{ color: "#fff" }}>{deliveredCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#000" }}>Хүргэлтийн төлбөр:</span>
            <span style={{ color: "#000" }}>{ddd}₮</span>
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>
          Нийт хуудас : {Math.ceil((props.data?.length ?? 0) / 50)}
        </div>
      </div>
    </div>
  );
};

export default Total;
