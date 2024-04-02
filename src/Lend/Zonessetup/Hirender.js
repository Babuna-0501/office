import React from "react";

const Hirender = (props) => {
  console.log("hirender", props);
  return (
    <div>
      {props.data.map((item) => {
        return <h3>{item.name}</h3>;
      })}
    </div>
  );
};

export default React.memo(Hirender);
