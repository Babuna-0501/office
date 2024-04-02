import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const SfaHook = (props) => {
  const [selectedWareHouse, setSelectedWareHouse] = useState();
  const [hete, setHete] = useState();
  const [targetMode, setTargetMode] = useState();
  const [routeMode, setRouteMode] = useState();
  const [routeHete, setRouteHete] = useState();
  const [targetUsers, setTargetUsers] = useState([]);
  const [productTarget, setProductTarget] = useState();
  const [categoryTarget, setCategoryTarget] = useState();
  const [brandTarget, setBrandTarget] = useState();

  useEffect(() => {
    // console.log("sssssss");
    const fetchdata = async () => {
      const myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const data = await fetch(
        "https://api2.ebazaar.mn/api/backoffice/users?target=1",
        requestOptions
      );
      //   console.log("data", data);
      const res = await data.json();
      setTargetUsers(res.data);
    };
    try {
      fetchdata();
    } catch (error) {
      console.log("users error ", error);
    }
  }, [hete]);

  useEffect(() => {
    if (targetUsers && hete) {
      setProductTarget(
        JSON.parse(targetUsers?.find((e) => e.user_id === hete).target)
          ?.productTarget
      );
      setCategoryTarget(
        JSON.parse(targetUsers?.find((e) => e.user_id === hete).target)
          ?.categoryTarget
      );
      setBrandTarget(
        JSON.parse(targetUsers?.find((e) => e.user_id === hete).target)
          ?.brandTarget
      );
    }
  }, [targetUsers, hete]);

  return (
    <Ctx.Provider
      value={{
        selectedWareHouse,
        setSelectedWareHouse,
        hete,
        setHete,
        targetMode,
        setTargetMode,
        routeHete,
        setRouteHete,
        routeMode,
        setRouteMode,
        productTarget,
        setProductTarget,
        targetUsers,
        setTargetUsers,
        categoryTarget,
        setCategoryTarget,
        brandTarget,
        setBrandTarget,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
