import React, { useState, useEffect } from "react";
import "./style.css";

const Total = (props) => {
  const [total, setTotal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [totalCancelPayment, setTotalCancelPayment] = useState(0);
  const [totalCancelPaymentAmount, setTotalCancelPaymentAmount] = useState(0);
  const [totalDeliveryPayment, setTotalDeliveryPayment] = useState(0);
  const [totalDeliveryAmount, setTotalDeliveryAmount] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [totalWaitingAmount, setTotalWaitingAmount] = useState(0);
  const [totalConfirmAmount, setTotalConfirmAmount] = useState(0);
  const [totalConfirmOrder, setTotalConfirmOrder] = useState(0);
  const [shipmentStatus, setShipmentStatus] = useState(0);

  //   console.log("props.data", props.data);
  useEffect(() => {
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
  let aaa = totalPrice?.toLocaleString();
  let bbb = totalPayment?.toLocaleString();
  let ccc = totalCancelPayment?.toLocaleString();
  let ddd = totalDeliveryPayment?.toLocaleString();
  let eee = totalWaiting?.toLocaleString();
  let fff = totalConfirmAmount?.toLocaleString();
  return (
    <div className="container">
      <div className="wrapper">
        <div className="footerspan">Захиалгын тоо: </div>
        <span className="footerspantww">{props.data?.length ?? 0}</span>
      </div>
      <div className="wrapper">
        <div className="footerspan">Нийт мөнгөн дүн :</div>
        <span className="footerspantww">{aaa}₮</span>
      </div>
      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper">
            <span>{totalWaitingAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span>Хүлээгдэж буй:</span>
            <span>{eee}₮</span>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#00ADD0" }}>
            <span style={{ color: "#fff" }}>{totalConfirmOrder}ш</span>
          </div>
          <div className="secondwrapper">
            <span>Баталгаажсан:</span>
            <span>{fff}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#76CC33" }}>
            <span style={{ color: "#fff" }}>{totalDeliveryAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span>Хүргэгдсэн:</span>
            <span>{ddd}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#EB5E43" }}>
            <span style={{ color: "#fff" }}>{totalCancelPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span>Цуцлагдсан:</span>
            <span>{ccc}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#DFEDDA" }}>
            <span>{totalPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span>Нийт төлбөр төлөлт:</span>
            <span>{bbb}₮</span>
          </div>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default Total;
