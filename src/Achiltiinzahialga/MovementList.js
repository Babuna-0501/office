import React from "react";
import myHeaders from "../components/MyHeader/myHeader";
import { useEffect } from "react";
import SingleMovement from "./components/MovementList/SingleMovement";
import { useState } from "react";
import css from "./movementList.module.css";
import MovementListHeader from "./components/MovementList/Header";

const MovementList = (props) => {
  const [movementList, setMovementList] = useState([]);
  const { userData, inventories, setSidemenuData, startDate, endDate } = props;

  const getMovementList = async () => {
    try {
      const companyId =
        userData.company_id.replace(/\|/g, "") == 1
          ? 13884
          : userData.company_id.replace(/\|/g, "");

      // neg uduriin daraah datag avj bn
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 2);

      let url = `https://api2.ebazaar.mn/api/shipment/get/final?supplierId=${companyId}&statuses=[1,2]&startDate=${startDate}&endDate=${
        endDateObj.toISOString().split("T")[0]
      }&createdDate=true`;

      companyId === 13884 &&
        (url = `https://api2.ebazaar.mn/api/shipment/get/final?&statuses=[1,2]&startDate=${startDate}&endDate=${
          endDateObj.toISOString().split("T")[0]
        }&createdDate=true`);


      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      resData.data && setMovementList(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData.company_id) {
      getMovementList();
    }
  }, [userData.company_id]);
  return (
    <div className={css.container}>
      <MovementListHeader />
      <div className={css.movementList}>
        {movementList?.map((movement) => (
          <SingleMovement
            movement={movement}
            inventories={inventories}
            isSideMenu={props.isSideMenu}
            setSidemenuData={setSidemenuData}
            setIsSideMenu={props.setIsSideMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default MovementList;
