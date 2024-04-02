import React, { useContext, useState, useEffect } from "react";
import { Checkbox, Col, Row } from "antd";
import css from "./selectzones.module.css";
import TdaysHook from "../../../Hooks/TdaysHook";

const Select = (props) => {
  const [optionPlan, setOptionPlan] = useState([]);
  const [ids, setIds] = useState([]);

  const tdaysctx = useContext(TdaysHook);
  const onChange = (checkedValues) => {
    // props?.setChannelID(checkedValues);
    setIds(checkedValues);
  };

  const saveHandler = () => {
    console.log("ids", ids);
    // console.log("tdaysctx.zonedata", tdaysctx.zonedata);
    tdaysctx.setZoneID(ids);
    props.setZonesShow(false);
  };

  useEffect(() => {
    if (props.chosedZones) {
      setIds(props.chosedZones);
    }
  }, [props.chosedZones]);

  return (
    <div>
      <div className={css.contentContainer}>
        <Checkbox.Group
          style={{
            width: "100%",
            background: "#fff",
          }}
          onChange={onChange}
          value={ids}
        >
          {props.zonedata.map((it, i) => {
            if (it.isActive === 1) {
              return (
								<Row key={i}>
									<Col span={12}>
										<Checkbox value={it._id} options={optionPlan}>
											<p style={{ width: "150px" }}> {it.name}</p>
										</Checkbox>
									</Col>
								</Row>
							);
            }
          })}
        </Checkbox.Group>
      </div>
      <div className={css.btncontainer}>
        <button onClick={saveHandler}>Хадгалах</button>
      </div>
    </div>
  );
};

export default Select;
