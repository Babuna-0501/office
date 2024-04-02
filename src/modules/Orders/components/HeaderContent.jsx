// CSS
import css from "./headerContent.module.css";

// Components
import { Button } from "../../../components/common";

import { useEffect, useState, useRef } from "react";

// Pictures
import uploadGray from "../../../assets/orders/Upload.svg";
import upload from "../../../assets/orders/Upload_white.svg";
import carIcon from "../../../assets/orders/car-icon-shipment.svg";
import XTcompany from "../../../Order/XTcompany";
import calendar from "../../../assets/shipment/Calendar.svg";
import arrowDown from "../../../assets/orders/arrow-down.svg";
import chevronRight from "../../../assets/orders/chevron-right.svg";
import ErrorPopup from "../../../components/common/ErrorPopup";

const dataIDS = ["|14057|", "|14045|", "|13954|"];

const statuses = [
  { title: "Бүх төлөв", color: "#fff", value: "" },
  { title: "Хүлээгдэж буй", color: "#D9D9D9", value: "1" },
  { title: "Баталгаажсан", color: "#00ADD0", value: "2" },
  { title: "Хүргэгдсэн", color: "#76CC33", value: "3" },
  { title: "Цуцлагдсан", color: "#EB5E43", value: "5" },
];

const dates = [
  { title: "Өнөөдөр+Өчигдөр", value: "today+yesterday" },
  { title: "Өнөөдөр", value: "today" },
  { title: "Өчигдөр", value: "yesterday" },
  { title: "Сүүлийн 3 хоног", value: "3 days" },
  { title: "Сүүлийн 7 хоног", value: "7 days" },
  { title: "Сүүлийн 1 сар", value: "1 month" },
  { title: "Огноогоор шүүх", value: "custom" },
];

export const HeaderContent = (props) => {
  console.log(props)
  console.log('***************************************************************************************************************************')
  const { userData, orderStatus, setOrderStatus } = props;
  const [permission] = useState(Object.values(JSON.parse(userData?.permission))[0]);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h1 className={css.title}>Захиалга</h1>

        <div className={css.filters}>
          <Filters orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
        </div>
      </div>

      <div className={css.rightSide}>
        <>
          {XTcompany.includes(userData.company_id) && (
            <>
              <Button variant="primary" size="medium">
                Түгээгчид хувиарлах22
              </Button>

              <Button variant="primary" size="medium" width={143} icon>
                <img src={carIcon} alt="Car" />
                Ачилт
              </Button>
            </>
          )}

          {userData.company_id === "|14057|" && permission.order.report && (
            <Button variant="primary" size="medium" icon>
              <img src={upload} alt="upload" />
              Тайлан
            </Button>
          )}

          {userData.company_id === "|14045|" && permission.order.report && (
            <Button variant="primary" size="medium" icon>
              <img src={upload} alt="upload" />
              Yuna тайлан
            </Button>
          )}

          {userData.company_id === "|13954|" && permission.order.report && (
            <Button variant="primary" size="medium" icon>
              <img src={upload} alt="upload" />
              Ариг тайлан
            </Button>
          )}

          {!dataIDS.includes(userData.company_id) && (
            <Button variant="primary" size="medium" icon>
              <img src={upload} alt="upload" />
              Тайлан
            </Button>
          )}

          <Button variant="secondary" size="medium" icon>
            <img src={uploadGray} alt="upload" />
            Дэлгэрэнгүй тайлан
          </Button>
        </>
      </div>
    </div>
  );
};

const Filters = ({ orderStatus, setOrderStatus }) => {
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  const statusFilterRef = useRef(null);
  const dateFilterRef = useRef(null);

  const [selectedShipmentDate, setSelectedShipmentDate] = useState(dates[0].value);
  const [customStartDate, setCustomStarDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (statusFilterRef.current && showStatusFilter && !statusFilterRef.current.contains(e.target)) {
        setShowStatusFilter(false);
      }

      if (dateFilterRef.current && showDateFilter && !dateFilterRef.current.contains(e.target)) {
        setShowDateFilter(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, [showStatusFilter, showDateFilter]);

  const changeDateHandler = () => {
    try {
      if (selectedShipmentDate === "custom") {
        if (!customStartDate) throw new Error("Эхлэх огноог оруулна уу!");
        if (!customEndDate) throw new Error("Дуусах огноог оруулна уу!");
        if (customStartDate > customEndDate) throw new Error("Эхлэх огноо дуусах огноог буруу оруулсан байна!");
      }
    } catch (error) {
      setErrorMsg(error.message ?? "Алдаа гарлаа. Та дахин оролдоно уу!");
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <div className={css.dateFilterWrapper}>
        <button type="button" onClick={() => setShowDateFilter(true)} className={css.dateFilterBtn}>
          <div>
            <img src={calendar} alt="Calendar" />
            <span>{dates.find((date) => date.value === selectedShipmentDate).title}</span>
          </div>
          <img src={arrowDown} alt="Arrow Down" />
        </button>

        {showDateFilter && (
          <div ref={dateFilterRef} className={css.dateFilterDropdownWrapper}>
            <div className={css.triangle} />

            <div className={css.dateFilterDropdown}>
              <div className={css.radioButtons}>
                {dates.map((date, index) => {
                  return (
                    <div key={`date-filter-radio-button-${index}`} className={css.radioBtnWrapper} style={{ zIndex: dates.length - index }}>
                      <input
                        id={date.title}
                        type="radio"
                        name="date"
                        checked={selectedShipmentDate === date.value}
                        onChange={() => {
                          setSelectedShipmentDate(date.value);
                        }}
                      />
                      <label htmlFor={date.title}>{date.title}</label>
                    </div>
                  );
                })}
              </div>

              {selectedShipmentDate === "custom" && (
                <div className={css.subDateFilters}>
                  <input type="date" value={customStartDate} onChange={(e) => setCustomStarDate(e.target.value)} />
                  <img src={chevronRight} alt="Chevron Right" />
                  <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
                </div>
              )}

              <div className={css.dateFilterBtns}>
                <Button variant="secondary" size="medium" width={80} onClick={() => setShowDateFilter(false)}>
                  Цуцлах
                </Button>
                <Button onClick={changeDateHandler} variant="primary" size="medium" width={100}>
                  Шүүх
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={css.statusFilterWrapper}>
        <button type="button" onClick={() => setShowStatusFilter(true)} className={css.statusFilterBtn}>
          <span>{statuses.find((stat) => stat.value === orderStatus).title}</span>
          <img src={arrowDown} alt="Arrow Down" />
        </button>

        {showStatusFilter && (
          <div ref={statusFilterRef} className={css.statusFilterDropdownWrapper}>
            <div className={css.triangle} />

            <div className={css.statusFilterDropdown}>
              {statuses.map((status, index) => {
                return (
                  <button
                    className={css.singleStatusBtn}
                    style={{
                      boxShadow: index === statuses.length - 1 && "none",
                      zIndex: statuses.length - index,
                    }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrderStatus(status.value);
                      setShowStatusFilter(false);
                    }}
                  >
                    <div style={{ backgroundColor: status.color }} />
                    <span>{status.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg("");
        }}
      />
    </>
  );
};
