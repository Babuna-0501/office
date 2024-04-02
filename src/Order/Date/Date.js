import React, { useContext, useState, useEffect } from "react";
import calendarImage from "../../assets/Calendar.svg";
import arrowDown from "../../assets/Arrow - Down.svg";
import css from "./date.module.css";
import Li from "./Li";
import Button from "../Button/Button";
import OrdersHook from "../../Hooks/OrdersHook";
import AppHook from "../../Hooks/AppHook";

const data = [
  {
    id: 1,
    name: "Өнөөдөр+Өчигдөр",
  },

  {
    id: 2,
    name: "Өнөөдөр",
  },

  {
    id: 3,
    name: "Өчигдөр",
  },
  {
    id: 4,
    name: "Сүүлийн 3 хоног",
  },
  {
    id: 5,
    name: "Сүүлийн 7 хоног",
  },
  {
    id: 6,
    name: "Сүүлийн 1 сар",
  },
  {
    id: 7,
    name: "Огноогоор шүүх",
  },
];

const Datepicker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [calendar, setCalendar] = useState(data[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startdate, setStartdate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [dateOpenModalOne, setDateOpenModalOne] = useState(false);
  const orderctx = useContext(OrdersHook);
  console.log("orders hook from calendar", orderctx);

  const toggleHandler = () => {
    setModalOpen(!modalOpen);
  };
  const activeHandler = (e) => {
    setActiveIndex(e);
    setCalendar(data[e]);
  };
  const dateHandler = () => {
    setDateOpenModalOne(true);
  };
  const btnCancelHandler = () => {
    console.log("clicked");
    setModalOpen(false);
  };
  const btnApproveHandler = () => {
    console.log("activeIndex", activeIndex);
    let date1 = new Date();
    console.log("day1", date1);
    let date2;

    ///// Ochigdor Onoodor
    if (activeIndex === 0) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();

      let year2 = new Date();
      year2.setDate(year2.getDate() - 1);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    ///// Onoodor
    if (activeIndex === 1) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();
      orderctx.setOrderStart(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    if (activeIndex === 2) {
      let year2 = new Date();
      year2.setDate(year2.getDate() - 1);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    if (activeIndex === 3) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();

      let year2 = new Date();
      year2.setDate(year2.getDate() - 3);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    if (activeIndex === 4) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();

      let year2 = new Date();
      year2.setDate(year2.getDate() - 7);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    if (activeIndex === 5) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();

      let year2 = new Date();
      year2.setDate(year2.getDate() - 30);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
      setStartdate(null);
      setFinishDate(null);
    }
    if (activeIndex === 6) {
      orderctx.setOrderStart(startdate);
      orderctx.setOrderEnd(finishDate);
    }
    setModalOpen(false);
  };
  useEffect(() => {
    console.log("activeIndex", activeIndex);
    let date1 = new Date();
    console.log("day1", date1);
    let date2;

    ///// Ochigdor Onoodor
    if (activeIndex === 0) {
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let days1 = date1.getDate();

      let year2 = new Date();
      year2.setDate(year2.getDate() - 1);
      console.log("year2", year2);

      let month2 = year2.getMonth() + 1;
      let days2 = year2.getDate();

      orderctx.setOrderStart(
        `${year2.getFullYear()}-${
          year2.getMonth() + 1 < 9 ? "0" + month2 : month2
        }-${year2.getDate() < 9 ? "0" + days2 : days2}`
      );
      orderctx.setOrderEnd(
        `${year1}-${month1 < 9 ? "0" + month1 : month1}-${
          days1 < 9 ? "0" + days1 : days1
        }`
      );
    }
  }, []);
  return (
    <div className={css.container}>
      <div className={css.mainwrapper} onClick={toggleHandler}>
        <div className={css.wrapper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src={calendarImage} className={css.calendar} alt="calendar" />
            <span
              style={{
                paddingTop: "2px",
              }}
            >
              {calendar.name}
            </span>
          </div>
          {modalOpen ? (
            <img src={arrowDown} alt="arrow down" className={css.arrowdown} />
          ) : (
            <img src={arrowDown} alt="arrow icon" className={css.arrow} />
          )}
        </div>
      </div>
      {modalOpen && (
        <div className={css.modal}>
          <ul
            style={{
              boxSizing: "border-box",
            }}
          >
            {data.map((item, index) => {
              return (
                <Li
                  key={index}
                  data={item}
                  index={index}
                  active={activeIndex}
                  onClick={activeHandler}
                />
              );
            })}
          </ul>
          {activeIndex === 6 && (
            <div className={css.calendarContainer}>
              <div className={css.calendarwrapper} onClick={dateHandler}>
                {/* <span>{startdate}</span> <img src={calendarImage} /> */}
                <input
                  type="date"
                  className={css.inputcalendar}
                  value={startdate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
              </div>
              <div className={css.calendarwrapper}>
                {/* <span>{finishDate}</span> <img src={calendarImage} /> */}
                <input
                  type="date"
                  value={finishDate}
                  className={css.inputcalendar}
                  onChange={(e) => setFinishDate(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className={css.btncontainer}>
            <Button className={css.cancelbtn} onClick={btnCancelHandler}>
              Цуцлах
            </Button>
            <Button className={css.approvebtn} onClick={btnApproveHandler}>
              Шүүх
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
