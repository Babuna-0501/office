import React, { useState, useEffect } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
import closeIcon from "../../../assets/close.svg";

const ZoneIndex = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api2.ebazaar.mn/api/zones`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <div>
      <div>
        <img
          src={{ closeIcon }}
          style={{
            width: "24px",
            height: "24px",
          }}
          alt="close icon"
          onClick={() => {
            props.setChannelOpen(false);
            props.setZoneOpen(false);
          }}
        />
      </div>
      <div>
        {data &&
          data.map((item, index) => {
            return <div key={index}>{item.name}</div>;
          })}
      </div>
    </div>
  );
};

export default ZoneIndex;
