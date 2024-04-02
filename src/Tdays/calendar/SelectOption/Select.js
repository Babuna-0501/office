import React, { useContext, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import css from "./select.module.css";
import TdaysHook from "../../../Hooks/TdaysHook";

const Select = (props) => {
  const tdaysctx = useContext(TdaysHook);

  const saveHandler = () => {
    props.setChannelShow(false);
  };

  const checkedhandler = (position) => {
    const updatedCheckedState = tdaysctx.list.map((item, index) =>
      index === position ? !item : item
    );
    console.log("updatedCheckedState", updatedCheckedState);
    tdaysctx.setList(updatedCheckedState);
  };

  return (
    <div>
      <div className={css.contentContainer} style={{ paddingBottom: "20px" }}>
        {tdaysctx.channel.map((item, i) => {
          return (
            <div
              style={{ display: "flex", marginBottom: "5px", marginTop: "5px" }}
              // onClick={() => checkedhandler(i)}
              key={i}
            >
              <Checkbox
                checked={tdaysctx.list[i]}
                onChange={() => checkedhandler(i)}
              >
                <span>{item.business_type_name}</span>
              </Checkbox>
              {/* <input
                type="checkbox"
                checked={tdaysctx.list[i]}
                onChange={() => checkedhandler(i)}
              />
              <span>{item.business_type_name}</span> */}
            </div>
          );
        })}
      </div>
      <div className={css.btncontainer}>
        <button onClick={saveHandler}>Хадгалах</button>
      </div>
    </div>
  );
};

export default Select;
