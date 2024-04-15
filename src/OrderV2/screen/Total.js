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
<<<<<<< HEAD
    if (props.data && props.data.length > 0) {

      // Нийт мөнгөн дүн
      let totalGrandTotal = props.data.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalPrice(totalGrandTotal);
  
      // Хүргэлтийн төлбөр
      let totalDelivery = props.data.reduce((acc, curr) => acc + curr.grand_total + 6000, 0); 
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
  

=======
    // setTotal(props?.data?.length);
    // let aa = Math.ceil(props?.data?.length / 50);
    // let totalC = 0;
    // let totalPaymentC = 0;
    // let totalPaymentAmountC = 0;
    // let totalCancelPaymentC = 0;
    // let totalCancelPaymentAmountC = 0;
    // let totalDeliveryPaymentC = 0;
    // let totalDelivery = 0;
    // let totalWait = 0;
    // let totalWaitingOrder = 0;
    // let totalConfirmAmountC = 0;
    // let totalConfirmOrderC = 0;
    // // console.log("props data", props.data);
    // for (let i = 0; i < props.data.length; i++) {
    //   props.data[i].line.map((item) => {
    //     let t = item.price * item.quantity;
    //     totalC = totalC + t;
    //   });
    //   if (props.data[i].status === 1) {
    //     props.data[i].line.map((item) => {
    //       //   let t = item.price * item.quantity;
    //       let t = item.amount;
    //       totalWait = totalWait + t;
    //     });
    //     totalWaitingOrder = totalWaitingOrder + 1;
    //   }
    //   if (props.data[i].status === 2) {
    //     props.data[i].line.map((item) => {
    //       let t = item.amount;
    //       totalConfirmAmountC = totalConfirmAmountC + t;
    //     });
    //     totalConfirmOrderC = totalConfirmOrderC + 1;
    //   }
    //   if (props.data[i].status === 5) {
    //     props.data[i].line.map((item) => {
    //       let t = item.amount;
    //       totalCancelPaymentC = totalCancelPaymentC + t;
    //     });
    //     totalCancelPaymentAmountC = totalCancelPaymentAmountC + 1;
    //   }
    //   if (props.data[i].status === 3) {
    //     totalDelivery = totalDelivery + 1;
    //     totalDeliveryPaymentC = totalDeliveryPaymentC + props.data[i].grand_total;
    //   }
    //   totalPaymentC = totalPaymentC + props.data[i].payment_amount;
    //   if (props.data[i].payment_amount) {
    //     totalPaymentAmountC = totalPaymentAmountC + 1;
    //   }
    // }
    // setTotalConfirmAmount(totalConfirmAmountC);
    // setTotalConfirmOrder(totalConfirmOrderC);
    // setTotalWaiting(totalWait);
    // setTotalWaitingAmount(totalWaitingOrder);
    // setTotalPayment(totalPaymentC);
    // setTotalPaymentAmount(totalPaymentAmountC);
    // setTotalCancelPayment(totalCancelPaymentC);
    // setTotalCancelPaymentAmount(totalCancelPaymentAmountC);
    // setTotalDeliveryPayment(totalDeliveryPaymentC);
    // setTotalDeliveryAmount(totalDelivery);
    // // if (aa === 0) {
    // //   aa = 1;
    // // }
    // if (totalPrice === null) {
    //   aa = 0;
    //   setTotalPage(aa);
    // } else {
    //   setTotalPage(aa);
    // }
    // setTotalPrice(totalC);
  }, [props.data, totalPrice]);
>>>>>>> d3cb662a8292c9912dcc3622329a8a94bdf2603e
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
<<<<<<< HEAD
        <div className="footerspan">Нийт захиалгын тоо: </div>
        <span className="footerspantww">{props.data?.length ?? 0}ш</span>
=======
        <div className="footerspan">Захиалгын тоо: </div>
        <span className="footerspantww">{props.data?.length ?? 0}</span>
>>>>>>> d3cb662a8292c9912dcc3622329a8a94bdf2603e
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
      <div className="wrapper" style={{ background: "#F2F2F2" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
<<<<<<< HEAD
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{color:"#000"}}>{pendingCount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#000"}}>Хүлээгдэж буй:</span>
            <span>{totalGrandTotalForPendingOrdersFormatted}₮</span>
=======
          <div className="firswrapper" style={{ background: "#76CC33" }}>
            <span style={{ color: "#fff" }}>{totalWaitingAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{ color: "#000" }}>Хүлээгдэж буй:</span>
            <span>{eee}₮</span>
>>>>>>> d3cb662a8292c9912dcc3622329a8a94bdf2603e
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div className="wrapper">
        <div>Нийт хуудас : {Math.ceil((props.data?.length ?? 0) / 50)}</div>
      </div>
      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="secondwrapper">
            <span> Хүргэлтийн мэдээлэл:</span>
            <span>{shipmentStatus}</span>
          </div>
        </div>
>>>>>>> d3cb662a8292c9912dcc3622329a8a94bdf2603e
      </div>
    </div>
  );
};

export default Total;