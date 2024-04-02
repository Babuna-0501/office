import React, { useEffect, useState, useContext } from "react";

import css from "./dropdownzone.module.css";
import plusicon from "../../assets/plus icon.svg";
import checkboxicon from "../../assets/check box.svg";
import chechboxchecked from "../../assets/Tick Square_green.svg";
import searchIcon from "../../assets/Search.svg";
import myHeaders from "../../components/MyHeader/myHeader";
import SMSHook from "../../Hooks/SMSHook";

const DropdownZone = (props) => {
  const [zonedata, setZonedata] = useState([]);
  const [searchvalue, setSearchvalue] = useState(null);

  const smsctx = useContext(SMSHook);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let params = "";
    let url = `https://api2.ebazaar.mn/api/zones`;

    if (searchvalue !== null && searchvalue.toString().length > 2) {
      params += `?name=${searchvalue}`;
      url = `https://api2.ebazaar.mn/api/zones${params}`;
    }

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        let update = res.data.map((item) => {
          return {
            ...item,
            chosed: false,
          };
        });
        setZonedata(update);
        props.setZonedata(update);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [searchvalue]);

  const ChosedHandler = (item, index) => {
    // console.log("item clicked", item);
    if (smsctx.zoneids.includes(item._id)) {
      let update = smsctx.zoneids.filter((x) => x !== item._id);
      smsctx.setZoneids(update);
    } else {
      smsctx.setZoneids((prev) => [...prev, item._id]);
    }

    let update = zonedata.map((x, i) => {
      let dataone = x;
      if (x._id === item._id) {
        return {
          ...dataone,
          chosed: x.chosed === true ? false : true,
        };
      }
      return dataone;
    });
    // console.log("item ", update);
    props.setZonedata(update);
    setZonedata(update);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.bodywrapper}>
          <div className={css.inputwrapper}>
            {" "}
            <input
              placeholder="Хайх"
              value={searchvalue}
              onChange={(e) => {
                setSearchvalue(e.target.value);
              }}
            />{" "}
            {searchvalue !== null &&
            searchvalue.toString().length !== 0 ? null : (
              <img src={searchIcon} alt="search icon" />
            )}
          </div>
          {zonedata &&
            zonedata.map((item, index) => {
              return (
                <div
                  className={css.itemwrapper}
                  key={index}
                  onClick={() => ChosedHandler(item, index)}
                  style={{
                    background: item.chosed ? "#F4FAED" : "#fff",
                  }}
                >
                  <img
                    src={
                      smsctx.zoneids.includes(item._id)
                        ? chechboxchecked
                        : checkboxicon
                    }
                    alt="check box icon"
                  />
                  <span>{item.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DropdownZone;
