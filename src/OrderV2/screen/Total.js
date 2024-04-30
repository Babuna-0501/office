import React, { useState, useEffect } from "react";
import "./style.css";
import getColorForStatus from "../components/color"; 

const Total = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [totalCancelPaymentAmount, setTotalCancelPaymentAmount] = useState(0);
  const [totalDeliveryPayment, setTotalDeliveryPayment] = useState(0);
  const [totalGrandTotalForConfirmedOrders, setTotalGrandTotalForConfirmedOrders] = useState(0);
  const [totalGrandTotalForDeliveredOrders, setTotalGrandTotalForDeliveredOrders] = useState(0);
  const [totalGrandTotalForCanceledOrders, setTotalGrandTotalForCanceledOrders] = useState(0);
  const [totalGrandTotalForPendingOrders, setTotalGrandTotalForPendingOrders] = useState(0);
  const [confirmedOrdersCount, setconfirmedOrdersCount] = useState(0); 
  const [canceledOrdersCount, setCanceledOrdersCount] = useState(0); 
  const [deliveredOrdersCount, setdeliveredOrdersCount] = useState(0); 
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
 

  useEffect(() => {
    if (props.data && props.data.length > 0) {

      // Нийт мөнгөн дүн
      let totalGrandTotal = props.data.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalPrice(totalGrandTotal);
  
      // Хүргэлтийн төлбөр
      let totalDelivery = deliveredCount * 4000; 
      setTotalDeliveryPayment(totalDelivery);

      // Нийт төлбөр төлөлт
      let totalPaymentAmount = props.data.reduce((acc, curr) => acc + curr.payment_amount, 0);
      setTotalPaymentAmount(totalPaymentAmount);
  
      // Баталгаажсан
      const confirmedOrders = props.data.filter(order => getColorForStatus(order.status)?.name === "Баталгаажсан");
      const totalGrandTotalForConfirmed = confirmedOrders.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalGrandTotalForConfirmedOrders(totalGrandTotalForConfirmed);
      setconfirmedOrdersCount(confirmedOrders.length);
  
      // Хүргэгдсэн
      const deliveredOrders = props.data.filter(order => getColorForStatus(order.status)?.name === "Хүргэгдсэн");
      const totalGrandTotalForDelivered = deliveredOrders.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalGrandTotalForDeliveredOrders(totalGrandTotalForDelivered);
      setdeliveredOrdersCount(deliveredOrders.length);

      // Цуцлагдсан
      const canceledOrders = props.data.filter(order => getColorForStatus(order.status)?.name === "Цуцлагдсан");
      const totalGrandTotalForCanceled = canceledOrders.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalGrandTotalForCanceledOrders(totalGrandTotalForCanceled);
      setCanceledOrdersCount(canceledOrders.length);

      // Хүлээгдэж буй
      const pendingOrders = props.data.filter(order => getColorForStatus(order.status)?.name === "Хүлээгдэж буй");
      const totalGrandTotalForPending = pendingOrders.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalGrandTotalForPendingOrders(totalGrandTotalForPending);
      setPendingOrdersCount(pendingOrders.length);

    }
  }, [props.data]);
  

  let aaa = totalPrice?.toLocaleString();
  let bbb = totalPaymentAmount?.toLocaleString();
  let ddd = totalDeliveryPayment?.toLocaleString();
  let totalGrandTotalForConfirmedOrdersFormatted = totalGrandTotalForConfirmedOrders?.toLocaleString();
  let totalGrandTotalForDeliveredOrdersFormatted = totalGrandTotalForDeliveredOrders?.toLocaleString();
  let totalGrandTotalForCanceledOrdersFormatted = totalGrandTotalForCanceledOrders?.toLocaleString();
  let totalGrandTotalForPendingOrdersFormatted = totalGrandTotalForPendingOrders?.toLocaleString();
  let canceledCount = canceledOrdersCount.toLocaleString();
  let confirmedCount = confirmedOrdersCount.toLocaleString();
  let deliveredCount = deliveredOrdersCount.toLocaleString();
  let pendingCount = pendingOrdersCount.toLocaleString();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="footerspan">Нийт захиалгын тоо: </div>
        <span className="footerspantww">{props.data?.length ?? 0}ш</span>
      </div>
      <div className="wrapper">
        <div className="footerspan">Нийт мөнгөн дүн :</div>
        <span className="footerspantww">{aaa}₮</span>
      </div>
      <div className="wrapper" style={{border:"1px solid #8DC543", width:"184px"}}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{background:"#8DC543", width:"90px"}}>
            <span style={{color:"#fff"}}>{totalPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{whiteSpace:"nowrap"}}>Нийт төлбөр төлөлт:</span>
            <span>{bbb}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{background:"#F2F2F2"}}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{color:"#000"}}>{pendingCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#000"}}>Хүлээгдэж буй:</span>
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
            <span style={{color:"#fff"}}>Баталгаажсан:</span>
            <span style={{color:"#fff"}}>{totalGrandTotalForConfirmedOrdersFormatted}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#76CC33" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }} >{deliveredCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#fff"}}>Хүргэгдсэн:</span>
            <span style={{color:"#fff"}}>{totalGrandTotalForDeliveredOrdersFormatted}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#EB5E43" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{background:"#fff"}}>
            <span style={{ color: "#000" }}>{canceledCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#fff"}}>Цуцлагдсан:</span>
            <span style={{color:"#fff"}}>{totalGrandTotalForCanceledOrdersFormatted}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper"  style={{ background: "#fff" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{background:"#8DC543"}}>
            <span style={{ color: "#fff" }}>{totalCancelPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#000"}}>Хүргэлтийн төлбөр:</span>
            <span style={{color:"#000"}}>{ddd}₮</span>
          </div>
        </div>
      </div>
      <div>
        <div style={{fontSize:"12px" , fontWeight:"bold"}}>Нийт хуудас : {Math.ceil((props.data?.length ?? 0) / 50)}</div>
      </div>
    </div>
  );
};

export default Total;