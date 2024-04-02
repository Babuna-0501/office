import React, { useContext, useState, useEffect } from "react";
import css from "./lend.module.css";
import { styles } from "./style";
import Button from "./components/Button";
import LendHook from "../Hooks/LendHook";
import ZonesIndex from "./Zonessetup/ZonesIndex";
import Newzone from "./Zonessetup/Newzone";

const Lend = ({ worker, index, onClick }) => {
  const lendctx = useContext(LendHook);
  const [dateState, setDateState] = useState(null);
  const [hourState, setHourState] = useState(null);
  const [active, setActive] = useState(null);

  const clickHandler = () => {
    lendctx.setLendState(true);
    console.log("lendctx.worker+++++", worker);

    lendctx.setWorker(worker);
    onClick(worker);
  };
  // console.log("alldelguur", lendctx.allDelguur);
  useEffect(() => {
    setDateState(worker.updated_date?.slice(0, 16).split("T")[0]);
    setHourState(worker.updated_date?.slice(0, 16).split("T")[1]);
  }, [worker]);

  const handleChange = (event, index) => {
    // console.log("index", index);
    if (event.target.checked) {
      setActive(index);
    } else {
      setActive(null);
    }
  };
  const leasingHandler = () => {
    lendctx.setZoneState(true);
    lendctx.setWorker(worker);
  };
  const updateLeasingHandler = () => {
    // console.log("worker ++ 123456", worker);

    lendctx.setZoneState(true);
    lendctx.setWorker(worker);
  };
  return (
    <div
      className={css.container}
      style={{
        background: active === index ? "#F1F1FA" : "#fff",
        display: worker.user_id === 272 ? "none" : "flex",
      }}
    >
      <div style={{ ...styles.checkboxcontainer }}>
        <div className={css.checinput}>
          <input type="checkbox" onChange={(e) => handleChange(e, index)} />
        </div>
      </div>
      <div style={{ ...styles.codeContainer }}>
        <span className={css.spanwrapper}>{worker.user_id}</span>
      </div>
      <div style={{ ...styles.positionContainer }}>
        <span className={css.spanwrapper}>{worker.role}</span>
      </div>
      <div style={{ ...styles.nameContainer }}>
        <span className={css.spanwrapper}>{worker.last_name}</span>
      </div>
      <div style={{ ...styles.nameContainer }}>
        <span className={css.spanwrapper}>{worker.first_name}</span>
      </div>
      <div style={{ ...styles.dateContainer }}>
        <span className={`${css.spanwrapper} ${css.ptag}`}>
          <p>{dateState}</p>
          <p>{hourState}</p>
        </span>
      </div>
      <div style={{ ...styles.zoneContainer }} className={`${css.wrapperbtn}`}>
        {worker.zones === null && (
          <Button className={css.btn} onClick={leasingHandler}>
            Хувиарлах
          </Button>
        )}
        {worker.zones !== null && (
          <Button className={css.address} onClick={updateLeasingHandler}>
            Хувиарлагдсан
          </Button>
        )}
      </div>
      <div
        style={{
          ...styles.settingContainer,
          display: worker.zones || worker.zones === "" ? "block" : "none",
        }}
        className={css.wrapperbtn}
      >
        {worker.leasing === null && (
          <Button className={css.btntwo} onClick={clickHandler}>
            Зээл эрх +
          </Button>
        )}
        {worker.leasing !== null && (
          <Button className={css.btnthree} onClick={clickHandler}>
            {worker.leasing.leasing_total.toLocaleString()}₮
          </Button>
        )}
      </div>
      {/* {lendctx.zoneState && <Newzone data={worker} />} */}
    </div>
  );
};

export default Lend;
