import React, { useState, useEffect } from "react";
import css from "./headerxt.module.css";
import arrowdownicon from "../../../assets/Arrow - Down.svg";
import checkboxicon from "../../../assets/check box.svg";
import chechboxchecked from "../../../assets/Tick Square on 2.svg";
import Button from "../../../components/Button/Button";

const HeaderXT = (props) => {
  const [zoneshow, setZoneshow] = useState(false);
  const [zonefalse, setZonefalse] = useState([]);

  const showHandler = () => {
    setZoneshow((prev) => !prev);
  };
  const checkedHandler = (item, index) => {
    const updatedCheckedState = zonefalse.map((item, position) =>
      index === position ? !item : item
    );

    setZonefalse(updatedCheckedState);
    props.setZonebtn(updatedCheckedState);
  };
  useEffect(() => {
    let zone = [];
    props.zones.map((item) => {
      zone.push(false);
    });
    setZonefalse(zone);
  }, [props.zones]);
  const ClearHandler = () => {
    const updatedCheckedState = zonefalse.map((item) => (item = false));
    setZonefalse(updatedCheckedState);
  };
  const CancelHandler = () => {
    const updatedCheckedState = zonefalse.map((item) => (item = false));
    setZonefalse(updatedCheckedState);
    setZoneshow(false);
  };
  const ConfirmHanlder = () => {
    setZoneshow(false);
  };

  return (
    <div className={css.container}>
      <div className={css.headername}>
        <span>2023 хуваарь</span>
      </div>
      <div className={css.wrapper}>
        <div className={`${css.optiowrapper} ${css.positioncss}`}>
          <div className={css.wrapperone} onClick={showHandler}>
            <span>Бүсчлэл сонгох</span>{" "}
            <img src={arrowdownicon} alt="arrow down" />
          </div>

          <div>
            {zoneshow && (
              <div className={css.beforewrapper}>
                <div className={css.tseverleh} onClick={ClearHandler}>
                  Цэвэрлэх
                </div>
                <div className={css.dropdown}>
                  {props.zones.map((item, index) => {
                    return (
                      <div
                        className={css.onewrapper}
                        onClick={() => checkedHandler(item, index)}
                        key={index}
                      >
                        <span>{item.name}</span>
                        <img
                          src={
                            zonefalse[index] === true
                              ? chechboxchecked
                              : checkboxicon
                          }
                          alt="check box "
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={css.btn}>
                  <Button className={css.cancelbtn} onClick={CancelHandler}>
                    Цуцлах
                  </Button>
                  <Button className={css.confirm} onClick={ConfirmHanlder}>
                    Хадгалах
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={css.optiowrapper}>
          <select>
            <option>Онцгой харилцагч сонгох</option>
            {props.zones.map((item, index) => {
              return <option key={index}>{item.name}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderXT;
