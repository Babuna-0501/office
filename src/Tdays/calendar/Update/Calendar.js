import React, { useState, useEffect, useContext } from "react";
import Month from "../CalendarMonth/Month";
import css from "./calendar.module.css";
import arrowDown from "../../../assets/Arrow - Down.svg";
import ProductReportHook from "../../../Hooks/ProductsReportHook";
import SelectUpdate from "../SelectOption/SelectUpdate";

import ZonesHook from "../../../Hooks/ZonesHook";
import CheckboxComponent from "../Checked/CheckboxComponent";
// import SelectSupplierUpdate from "../SelectSupplier/SelectSupplierUpdate";
import SelectZonesUpdate from "../SelectZones/SelectZonesUpdate";
import TdaysHook from "../../../Hooks/TdaysHook";
import DeliveryTime from "../../calendarTime.json";
import checkedsvg from "../../../assets/Tick Square on 2.svg";
import uncheckedsvg from "../../../assets/Tick Square.svg";

function Calendar(props) {
  const [data, setData] = useState({});
  const [hour, setHour] = useState(null);
  const [channel, setChannel] = useState([]);
  const [zones, setZones] = useState([]);
  const [channelShow, setChannelShow] = useState(false);
  const [zonesShow, setZonesShow] = useState(false);
  const [nameValue, setNameValue] = useState(null);
  const [checkedValue, setCheckedValue] = useState(false);
  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [value, setValue] = useState("16:00");

  const ctxProduct = useContext(ProductReportHook);
  const ctxZones = useContext(ZonesHook);
  const tdayctx = useContext(TdaysHook);
  console.log("calendar updat props", props);
  // console.log(" props.schedule", props.schedule);

  // const foobar = {
  //   "2022-10-12": true,
  //   "2022-10-13": true,
  // };
  // const foobar = props.schedule;

  useEffect(() => {
    console.log("Data", data);
    tdayctx.setAllChosedDays(data);
  }, [data]);
  useEffect(() => {
    if (props.deliveryTime !== null) {
      setValue(props.deliveryTime);
    }
  }, [props]);
  useEffect(() => {
    let aaa = {};
    let bbb;
    let zzz = {};
    if (props.schedule) {
      aaa = { ...props.schedule[0] };

      bbb = Object.keys(aaa);
      bbb.map((item) => {
        if (item === "2022-10-13" || item === "2022-10-12") {
          console.log("hi");
        } else {
          let data = new Date(item);
          let garig = data.getDay();
          // console.log("garig", garig);
          if (garig === 3 || garig === 4) {
            console.log("item");
          }

          checked[`${garig}`] = true;
          zzz[
            `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
          ] = true;
        }
      });
      // console.log("zzя-----", zzz);
      setData(zzz);
    }
  }, [props.schedule]);
  const data2022 = [
    ["11 сар", 30, 1, 10, 2022],
    ["12 сар", 33, 3, 11, 2022],
  ];
  const data2023 = [
    ["1 сар", 36, 6, 0, 2023],
    ["2 сар", 29, 2, 1, 2023],
    ["3 сар", 32, 2, 2, 2023],
    ["4 сар", 34, 5, 3, 2023],
    ["5 сар", 30, 0, 4, 2023],
    ["6 сар", 32, 3, 5, 2023],
    ["7 сар", 35, 5, 6, 2023],
    ["8 сар", 31, 1, 7, 2023],
    ["9 сар", 33, 4, 8, 2023],
    ["10 сар", 36, 6, 9, 2023],
    ["11 сар", 31, 2, 10, 2023],
    ["12 сар", 34, 4, 11, 2023],
  ];
  // const [index, setIndex] = useState(null);

  let days = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

  const ChoseDays = (b) => {
    checked[b] = !checked[b];

    let stateCopy = data;

    // data2022.map((m) => {
    //   for (let i = 1; i <= m[1]; i++) {
    //     let temp = new Date(`${m[4]}-${m[3] + 1}-${i}`);

    //     if (temp.getDay() === b) {
    //       if (
    //         stateCopy[
    //           `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
    //         ]
    //       ) {
    //         stateCopy[
    //           `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
    //         ] = false;
    //       } else {
    //         stateCopy[
    //           `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
    //         ] = true;
    //       }
    //     }
    //   }
    // });
    data2023.map((m) => {
      for (let i = 1; i <= m[1]; i++) {
        let temp = new Date(`${m[4]}-${m[3] + 1}-${i}`);

        if (temp.getDay() === b) {
          // stateCopy[
          //   `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
          // ] = true;
          if (
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ]
          ) {
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ] = false;
          } else {
            stateCopy[
              `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
            ] = true;
          }
        }
      }
    });
    setData({
      ...data,
      ...stateCopy,
    });

    // console.log("data kyes", Object.entries(data));

    // console.log("aaaa", Object.entries(data));
    // let buhdays = [];
    // let aaa = Object.entries(data);
    // aaa.map((item) => {
    //   if (item[1] === true) {
    //     buhdays.push(item[0]);
    //   }
    // });
    // console.log("buhdays", buhdays);
    let bc = {};
    for (var key of Object.keys(data)) {
      console.log(key + " -> " + data[key]);
      if (data[key] === true) {
        bc[key] = true;
      }
    }
    console.log("bc - update", bc);
    tdayctx.setDays(bc);
  };

  useEffect(() => {
    let arr = [];
    let zonearr = [];

    ctxProduct.sitedata?.business_types.map((it) => {
      arr.push(it);
    });
    setChannel(arr);
    ctxZones.zonedata?.map((item) => {
      if (item.isActive === 1) {
        zonearr.push({
          business_type_name: item.name,
          business_type_id: item._id,
        });
      }
    });
    setZones(zonearr);
  }, []);
  const channelShowHandler = () => {
    // setChannelShow((channelShow) => !channelShow);
    setChannelShow(true);
  };
  const zonesShowHandler = () => {
    // setZonesShow((zonesShow) => !zonesShow);
    setZonesShow(true);
  };

  const handleOnChange = (e) => {
    setNameValue(e.target.value);
    console.log(e);
  };
  const hourHandler = (e) => {
    setHour(e.target.value);
  };
  const handleChangeTime = (e) => {
    setValue(e.target.value);
    props.setDeliveryTime(e.target.value);
  };
  return (
    <div style={{ width: "100%", background: "#FBFBFC" }} key={Math.random()}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0px",
          background: "#FBFBFC",
          paddingBottom: "5px",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "350px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {days.map((b, i) => {
            // console.log("checked[i]", b);
            // console.log("checked", checked[i]);
            return (
              <div
                style={{
                  width: "76px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  borderRadius: "5px",
                  border: checked[i]
                    ? "1px solid #ffa400"
                    : "1px solid #CFD8DC",
                  padding: "5px",
                  background: checked[i] ? "#FFEDCC" : "#fff",
                }}
                onClick={() => ChoseDays(i)}
                key={Math.random()}
              >
                {/* <input
                  type="checkbox"
                  checked={checked[i]}
                  value={checkedValue}
                  onChange={(e) => setCheckedValue(e.target.checked)}
                  // onChange={(e) => setChecked(e.target.checked)}
                  className={css.inputchecked}
                /> */}
                <img
                  src={checked[i] === true ? checkedsvg : uncheckedsvg}
                  alt="checked svg"
                  style={{
                    width: "15px",
                    height: "15px",
                    marginRight: "10px",
                  }}
                />
                <span
                  style={{
                    color: checked[i] ? "#37474" : " #90A4AE",
                    fontSize: "12px",
                    fontWeight: checked[i] ? "700" : "400",
                  }}
                >
                  {b}
                </span>
              </div>
            );
          })}
        </div>

        <div className={css.selectContainer}>
          <div className={css.selectoptioncontainer}>
            <select
              value={value}
              onChange={handleChangeTime}
              className={css.selectOption}
            >
              {DeliveryTime.map((item) => {
                return <option value={item.value}>{item.value}</option>;
              })}
            </select>
          </div>

          <div style={{ position: "relative", width: "200px" }}>
            {/* <SelectOption placeOne="Бүх суваг" channel={channel} /> */}
            <div
              className={css.channelChoseContainer}
              onClick={channelShowHandler}
            >
              <span>Бүх суваг</span>
              <img
                src={arrowDown}
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                }}
              />
            </div>
            {channelShow && (
              <SelectUpdate
                channel={channel}
                setChannelShow={setChannelShow}
                chosedChannels={props.chosedChannels}
                setChosedChannels={props.setChosedChannels}
              />
            )}
          </div>
          <div style={{ position: "relative", width: "200px" }}>
            {/* <SelectOption placeOne="Бүх суваг" channel={channel} /> */}
            <div
              className={css.channelChoseContainer}
              onClick={zonesShowHandler}
            >
              <span>Бүх бүсчлэл</span>
              <img
                src={arrowDown}
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                }}
              />
            </div>
            {zonesShow && (
              <SelectZonesUpdate
                zones={zones}
                setZonesShow={setZonesShow}
                setChosedZones={props.setChosedZones}
                chosedZones={props.chosedZones}
                zonedata={props.zonedata}
              />
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "10px 0px",
          // justifyContent: "space-between",
          // flexDirection: "row",
          width: "100%",
          flexDirection: "column",
          overflowX: "auto",
        }}
      >
        {/* <div
          style={{
            color: "#37474F",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          2022
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {data2022.map((item) => {
            return (
              <Month
                item={item}
                data={data2022}
                foobar={data}
                // index={index}
                key={Math.random()}
                days={days}
                setData={setData}
              />
            );
          })}
        </div> */}
        <div
          style={{
            color: "#37474F",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          2023
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            paddingBottom: "10px",
          }}
        >
          {data2023.map((item) => {
            // console.log("item", item);
            return (
              <Month
                item={item}
                data={data2023}
                foobar={data}
                // index={index}
                key={Math.random()}
                days={days}
                setData={setData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
