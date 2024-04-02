import React from "react";
import css from "./singleInventoryHistory.module.css";
import { useEffect } from "react";

const SingleInventoryHistory = (props) => {
  const { inventories, shipment } = props;

  console.log("shipment", shipment);

  const getInventoryName = ({ inventoryId }) => {
    if (!inventoryId) {
      return "";
    }
    const foundInventory = inventories.find((e) => e._id === inventoryId);
    return foundInventory ? foundInventory.name : null;
  };

  function dateFormater(dateTimeString) {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-GB", options); // Adjust the locale as needed
  }

  const checkType = ({ type }) => {
    if (type === 1) {
      return "Орлого";
    } else if (type === 2) {
      return "Зарлага";
    } else if (type === 3) {
      return "Агуулах хооронд";
    } else {
      return "";
    }
  };
  const checkStatus = ({ status }) => {
    if (status === 3) {
      return "Гүйцэтгэсэн";
    } else if (status === 4) {
      return "Цуцлагдсан";
    } else {
      return "";
    }
  };

  return (
    <div className={css.container}>
      <div>
        <span>{shipment.supplierId}</span>
      </div>
      <div>
        <span>{shipment.documentId}</span>
      </div>
      <div style={{ width: "90px" }}>
        <span>{checkStatus({ status: Number(shipment.status) })}</span>
      </div>
      <div style={{ width: "100px" }}>
        <span>{checkType({ type: Number(shipment.type) })}</span>
      </div>
      <div style={{ width: "250px" }}>
        <span>{getInventoryName({ inventoryId: shipment?.to || "" })}</span>
      </div>
      <div style={{ width: "250px" }}>
        <span>{getInventoryName({ inventoryId: shipment?.from || "" })}</span>
      </div>
      {/* <div style={{ width: "200px" }}>
        <span>Backoffice - s хөдөлгөөн. User: 1124</span>
      </div> */}
      {/* <div>
        <span>1124</span>
      </div> */}
      <div style={{ width: "150px" }}>
        <span>{dateFormater(shipment.createdDate).replace(/,/g, " ")}</span>
      </div>
    </div>
  );
};

export default SingleInventoryHistory;
