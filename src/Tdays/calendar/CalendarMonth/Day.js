import React from "react";

const Day = (props) => {
  // console.log("props.data days", props);
  const temp = props.data
    ? `${props.year}-${props.month + 1}-${props.day}`
    : null;
  // console.log("temp days+++", props.data);

  const CheckHandler = () => {
    // console.log("props.foobar[temp] ", props.foobar[temp]);

    let aaa = props.foobar[temp] ? false : true;
    let bbb = (props.foobar[temp] = aaa);
    // console.log(aaa);
    props.setData({
      ...props.foobar,
      bbb,
    });
  };
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        background: "white",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-day={temp}
      onClick={CheckHandler}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          background: props.data && props.foobar[temp] ? "#ffa400" : "white",
          borderRadius: props.data && props.foobar[temp] ? "50%" : "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: props.data && props.foobar[temp] ? "#fff" : "#263238",
        }}
      >
        {props.day}
      </span>
    </div>
  );
};

export default Day;
