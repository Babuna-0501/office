import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const AppHook = (props) => {
  const [page, setPage] = useState(
    window.localStorage.getItem("ebazaar_admin_token")
      ? ["dashboard"]
      : ["login"]
  );

  const [userData, setUserData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subPage, setSubPage] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState(null);
  const [hete, setHete] = useState();
  const [tabOpenstate, setTabOpenstate] = useState(false);
  const [noatInfo, setNoatInfo] = useState(null);
  const [noatCheck, setNoatCheck] = useState(false);
  const [startdate, setStartdate] = useState(
    window.localStorage.getItem("startdate")
      ? window.localStorage.getItem("startdate")
      : null
  );
  const [enddate, setEnddate] = useState(
    window.localStorage.getItem("enddate")
      ? window.localStorage.getItem("enddate")
      : null
  );
  const [orderID, setOrderID] = useState(null);
  const [padaanNote, setPadaanNote] = useState("");
  const [note, setNote] = useState("");

  return (
    <Ctx.Provider
      value={{
        page,
        setPage,
        userData,
        setUserData,
        supplier,
        setSupplier,
        suppliers,
        setSuppliers,
        subPage,
        setSubPage,
        selectedWareHouse,
        setSelectedWareHouse,
        hete,
        setHete,
        tabOpenstate,
        setTabOpenstate,
        noatInfo,
        setNoatInfo,
        noatCheck,
        setNoatCheck,
        enddate,
        setEnddate,
        startdate,
        setStartdate,
        orderID,
        setOrderID,
        padaanNote,
        setPadaanNote,
        note,
        setNote,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
