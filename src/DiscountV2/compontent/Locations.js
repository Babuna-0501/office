import React from "react";

import locationjson from "./locationname.json";

const Locations = (props) => {
  // console.log("props location", props.value);

  return (
    <div style={{ color: " #37474F", fontSize: "12px", fontWeight: "400" }}>
      {props.value}
      {/* {namedata.join(", ")} */}
    </div>
  );
};

export default Locations;
