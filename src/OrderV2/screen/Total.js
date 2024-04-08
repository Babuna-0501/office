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

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      let totalGrandTotal = props.data.reduce((acc, curr) => acc + curr.grand_total, 0);
      setTotalPrice(totalGrandTotal);
    }
  }, [props.data]);

  let aaa = totalPrice?.toLocaleString();
  let bbb = totalPayment?.toLocaleString();
  let ccc = totalCancelPayment?.toLocaleString();
  let ddd = totalDeliveryPayment?.toLocaleString();
  let eee = totalWaiting?.toLocaleString();
  let fff = totalConfirmAmount?.toLocaleString();
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
      <div className="wrapper" style={{background:"#F2F2F2"}}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#76CC33" }}>
            <span style={{color:"#fff"}}>{totalWaitingAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#000"}}>Хүлээгдэж буй:</span>
            <span>{eee}₮</span>
          </div>
        </div>
      </div>

      <div className="wrapper" style={{ background: "#00ADD0" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }}>{totalConfirmOrder}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#fff"}}>Баталгаажсан:</span>
            <span style={{color:"#fff"}}>{fff}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper" style={{ background: "#76CC33" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{ background: "#fff" }}>
            <span style={{ color: "#000" }} >{totalDeliveryAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#fff"}}>Хүргэгдсэн:</span>
            <span style={{color:"#fff"}}>{ddd}₮</span>
          </div>
        </div>
      </div>
      <div className="wrapper"  style={{ background: "#EB5E43" }}>
        <div style={{ color: "#90A4AE" }} className="statuscontainer">
          <div className="firswrapper" style={{background:"#fff"}}>
            <span style={{ color: "#000" }}>{totalCancelPaymentAmount}ш</span>
          </div>
          <div className="secondwrapper">
            <span style={{color:"#fff"}}>Цуцлагдсан:</span>
            <span style={{color:"#fff"}}>{ccc}₮</span>
          </div>
        </div>
      </div>
      <div>
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
