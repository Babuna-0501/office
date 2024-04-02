import React, { useState } from "react";
import css from "./singleMovement.module.css";
import { Button } from "../common";
import myHeaders from "../../../components/MyHeader/myHeader";

const SingleMovement = ({
  inventories,
  movement,
  setIsSideMenu,
  isSideMenu,
  setSidemenuData,
}) => {
  const getInventoryName = ({ inventoryId }) => {
    if (!inventoryId) {
      return "";
    }
    const foundInventory = inventories.find((e) => e._id === inventoryId);
    return foundInventory ? foundInventory.name : null;
  };
  console.log(movement)

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
    if (status === 1) {
      return "Хүлээгдэж буй";
    } else if (status === 2) {
      return "Баталгаажсан";
    } else {
      return "";
    }
  };

  const changeStatus = async ({ id, status }) => {
    try {
      const url = `https://api2.ebazaar.mn/api/shipment/status/final`;

      const requestBody = JSON.stringify({ _id: id, status });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: requestBody,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      console.log("resData", resData);
      if (resData.success) {
        if (status === 2) {
          alert("Амжилттай батлагдлаа");
        } else if (status === 3) {
          alert("Амжилттай гүйцэтгэлээ");
        } else if (status === 4) {
          alert("Амжилттай цуцлагдлаа");
        }
      } else {
        alert(resData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const btns = movement.status !== 2 ? (
    <>
    <div style={{ width: "80px" }}>
            <Button
          onClick={() => {
            changeStatus({ id: movement._id, status: 2 });
          }}
        >
          Батлах
        </Button>
              </div>
      <div style={{ width: "80px" }}>
        <Button
          onClick={() => {
            changeStatus({ id: movement._id, status: 3 });
          }}
        >
          Гүйцэтгэсэн
        </Button>
      </div>
      <div style={{ width: "80px" }}>
        <Button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            changeStatus({ id: movement._id, status: 4 });
          }}
        >
          Цуцлах
        </Button>
      </div>
      </>
  ) : null

  return (
    <div className={css.container}>
      <div
        style={{ width: "max-content" }}
        onClick={() => {
          setSidemenuData(movement);
          setIsSideMenu(!isSideMenu);
        }}
      >
        <div>
          <span>{movement.supplierId}</span>
        </div>
        <div>
          <span>{movement.documentId}</span>
        </div>
        <div style={{ width: "90px" }}>
          <span>{checkStatus({ status: Number(movement.status) })}</span>
        </div>
        <div style={{ width: "150px" }}>
          <span>{checkType({ type: Number(movement.type) })}</span>
        </div>
        <div style={{ width: "250px" }}>
          <span>{getInventoryName({ inventoryId: movement?.from || "" })}</span>
        </div>
        <div style={{ width: "250px" }}>
          <span>{getInventoryName({ inventoryId: movement?.to || "" })}</span>
        </div>
        {/* <div style={{ width: "200px" }}>
        <span>Backoffice - s хөдөлгөөн. User: 1124</span>
      </div> */}
        {/* <div>
        <span>1124</span>
      </div> */}
        <div style={{ width: "150px" }}>
          <span>{dateFormater(movement.createdDate).replace(/,/g, " ")}</span>
        </div>
      </div>
      
      {btns}

    </div>
  );
};

export default SingleMovement;
