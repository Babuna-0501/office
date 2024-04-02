import React, { useState, useEffect } from "react";
import { Checkbox, Col, Row } from "antd";
import css from "./select.module.css";

const SelectUpdate = (props) => {
  const [optionPlan, setOptionPlan] = useState([]);
  const [ids, setIds] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const onChange = (checkedValues) => {
    // console.log("checked list ", checkedValues);
    setCheckedList(checkedValues);
    setIds(checkedValues);
  };

  const saveHandler = () => {
    props.setChosedChannels(checkedList);
    props.setChannelShow(false);
  };
  useEffect(() => {
    setCheckedList(props.chosedChannels);
  }, [props.chosedChannels]);

  return (
    <div>
      <div className={css.contentContainer}>
        <Checkbox.Group
          style={{
            width: "100%",
            background: "#fff",
          }}
          onChange={onChange}
          value={checkedList}
        >
          {props.channel?.map((it, i) => {
            return (
              <Row key={i}>
                <Col span={12}>
                  <Checkbox value={it.business_type_id} options={optionPlan}>
                    <p style={{ width: "150px" }}> {it.business_type_name}</p>
                  </Checkbox>
                </Col>
              </Row>
            );
          })}
        </Checkbox.Group>
      </div>
      <div className={css.btncontainer}>
        <button onClick={saveHandler}>Хадгалах</button>
      </div>
    </div>
  );
};

export default SelectUpdate;
