import React, { useState } from "react";

const Ctx = React.createContext();

export const OrderReportHook = (props) => {
  const [report, setReport] = useState(false);
  const [reportSecond, setReportSecond] = useState(false);
  const [reportThird, setReportThird] = useState(false);
  const [reportDiamond, setReportDiamond] = useState(false);
  const [filterUrl, setFilterUrl] = useState("");
  const [orderReportUrl, setOrderReportUrl] = useState(false);
  const [showYunaReport, setShowYunaReport] = useState(false);
  const [showArigReport, setShowArigReport] = useState(false);
  const [tugeegchBtnDisabled, setTugeegchBtnDisabled] = useState(true);
  const [shipmentBtnDisabled, setShipmentBtnDisabled] = useState(true);
  const [showTugeegchAssign, setShowTugeegchAssign] = useState(false);
  const [showShipmentAssign, setShowShipmentAssign] = useState(false);
  const [showColaOrders, setShowColaOrders] = useState(false);
  const [showOrderNegtgel, setShowOrderNegtgel] = useState(false);
  const [showOrderReceipts, setShowOrderReceipts] = useState(false);
  const [buramhanReport, setBuramhanReport] = useState(false);
	const [bmTovchoo, setBmTovchoo] = useState(false);
	const [yunaTailanType, setYunaTailanType] = useState(0);

  return (
    <Ctx.Provider
      value={{
        report,
        setReport,
        reportSecond,
        setReportSecond,
        reportDiamond,
        setReportDiamond,
        filterUrl,
        setFilterUrl,
        orderReportUrl,
        setOrderReportUrl,
        reportThird,
        setReportThird,
        showYunaReport,
        setShowYunaReport,
        showArigReport,
        setShowArigReport,
        tugeegchBtnDisabled,
        setTugeegchBtnDisabled,
        shipmentBtnDisabled,
        setShipmentBtnDisabled,
        showTugeegchAssign,
        setShowTugeegchAssign,
        showShipmentAssign,
        setShowShipmentAssign,
        showColaOrders,
        setShowColaOrders,
        showOrderNegtgel,
        setShowOrderNegtgel,
        showOrderReceipts,
        setShowOrderReceipts,
        buramhanReport,
        setBuramhanReport,
        bmTovchoo,
        setBmTovchoo,
        yunaTailanType,
        setYunaTailanType,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
