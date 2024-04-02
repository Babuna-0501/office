import { Checkbox } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";

const CheckboxComponent = (props) => {
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Checkbox onChange={onChange} className={props.class ? props.class : ""}>
      {props.data}
    </Checkbox>
  );
};

export default CheckboxComponent;
