import { useState, useEffect } from "react";
import css from "./xtcalendar.module.css";
import Month from "./Month";
import myHeaders from "../components/MyHeader/myHeader";
import checkedsvg from "../assets/Tick Square on 2.svg";
import uncheckedsvg from "../assets/Tick Square.svg";

const XTcalendar = (props) => {
  const [scheduleId, setScheduleId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [counter, setCounter] = useState(0);

  const [data, setData] = useState({});
  const [selectdays, setSelectdays] = useState({});
  const [dayname, setDayname] = useState("");
  const [xtdata, setXtdata] = useState([]);

  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setXtdata(props.dayData);
  }, [props.dayData]);

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

  let days = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

  const ChoseDays = (b) => {
    checked[b] = !checked[b];
    // checked[b] = true;
    // setChecked(!checked[b]);

    let stateCopy = data;
    // setActive(b);

    data2023.map((m) => {
      for (let i = 1; i <= m[1]; i++) {
        let temp = new Date(`${m[4]}-${m[3] + 1}-${i}`);
        // console.log("temp", temp);
        // console.log("B", b);
        if (temp.getDay() === b) {
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
      // ...data,
      ...stateCopy,
    });
  };

  useEffect(() => {
    const fetchPrevSchedules = async () => {
      try {
        const userId = props.data.user_id;
        if (!userId) return;

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const url = `https://api2.ebazaar.mn/api/employee/schedule/get?user_id=${userId}`;
        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setSchedules(resData.data.length > 0 ? resData.data[0].schedule : []);
        if (resData.data.length > 0) setScheduleId(resData.data[0]._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrevSchedules();
  }, [props.data, counter]);

  useEffect(() => {
    let uuu = {};
    // Object.keys(data).forEach((item) => {
    //   console.log("item");
    //   data[item] = true;
    // });
    let bbb = Object.keys(data);
    let correctDays = [];

    bbb.map((item) => {
      if (data[`${item}`] === true) {
        correctDays.push(item);
      }
    });
    // console.log("bbb=====----11111", correctDays);
    correctDays.map((item) => {
      // console.log("item", item);
      if (item === "bbb") {
        console.log("item bbb");
      } else if (item === "NaN-NaN-NaN") {
        console.log("NaN-NaN-NaN");
      } else {
        let data = new Date(item);
        // console.log("data", data);
        let yearaaa = data.getFullYear();
        let monthaaa = data.getMonth() + 1;
        let daysaaa = data.getDate();

        if (monthaaa < 10) {
          monthaaa = `0${monthaaa}`;
        } else {
          monthaaa = `${monthaaa}`;
        }
        if (daysaaa < 10) {
          daysaaa = `0${daysaaa}`;
        } else {
          daysaaa = `${daysaaa}`;
        }
        uuu[`${yearaaa}-${monthaaa}-${daysaaa}`] = true;
      }
    });

    // console.log("data-uuuuu", uuu);
    setSelectdays(uuu);
    // tdayctx.setDays(uuu);
  }, [data]);

  const Save = async () => {
    try {
      if (!dayname) {
        alert("Та түгээлтийн өдрийн нэр оруулна уу");
        return;
      }
      if (Object.keys(selectdays).length === 0) {
        alert("Та түгээлтийн өдрүүдээ оруулна уу");
        return;
      }

      const schedulesCopy = [...schedules];
      schedulesCopy.push({
        name: dayname,
        date: selectdays,
      });

      let rawData = JSON.stringify({
        user_id: props.data.user_id,
        supplier:
          Number(props.data.supplier_id.replaceAll("|", "")) === 1
            ? 13884
            : Number(props.data.supplier_id.replaceAll("|", "")),
        schedule: schedulesCopy,
      });

      if (scheduleId) {
        rawData = JSON.stringify({
          id: scheduleId,
          data: {
            user_id: props.data.user_id,
            supplier:
              Number(props.data.supplier_id.replaceAll("|", "")) === 1
                ? 13884
                : Number(props.data.supplier_id.replaceAll("|", "")),
            schedule: schedulesCopy,
          },
        });
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: rawData,
      };

      const url = `https://api2.ebazaar.mn/api/employee/schedule/${
        scheduleId ? "put" : "post"
      }`;

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 200) {
        alert("Шинэ хуваарь амжилттай нэмэгдлээ.");
        setData({});
        setDayname("");
        setChecked([false, false, false, false, false, false, false]);
        setSchedules(schedulesCopy);
        setCounter((p) => p + 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.daywrapper}>
          <div>
            <span
              style={{
                color: "#37474F",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              {`Нэр : ${xtdata?.first_name}, ID : ${xtdata?.user_id}`}
            </span>
            <input
              placeholder="ХТ хуваарийн нэр...."
              className={css.xtinput}
              value={dayname}
              onChange={(e) => {
                setDayname(e.target.value);
              }}
            />
          </div>

          <div
            style={{
              maxWidth: "400px",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              justifyContent: "flex-end",
            }}
          >
            {days.map((b, i) => {
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
        </div>

        <div
          style={{
            fontWeight: "700",
            fontSize: "16px",
            color: "#37474F",
          }}
        >
          2023 он
        </div>

        <div
          style={{
            display: "flex",
            margin: "10px 0px",
            width: "100%",
            overflowX: "auto",
            height: "600px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 10,
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

        <div className={css.btnwrapper}>
          <button
            className={css.cancel}
            onClick={(e) => {
              props.setDayopen(false);
            }}
          >
            Цуцлах
          </button>
          <button className={css.confirm} onClick={Save}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default XTcalendar;
