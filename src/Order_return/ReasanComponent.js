import React, { useEffect, useState } from "react";
import css from "./reasancomponent.module.css";
import Carousel from "./Carousel";

const ReasanComponent = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.data.order_data) {
      let databbb = JSON.parse(props.data.order_data);
      setData(databbb);
    }
  }, [props.data]);

  // console.log("props.data", data);
  return (
    <div className={css.container}>
      <div className={css.header}>Буцаагдсан шалтгаан</div>

      <div className={css.wrapper}>
        <ul className={css.slideList}>
          {data?.order_data?.map((pos, i) => {
            return <Carousel key={i} idx={i} pos={pos} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReasanComponent;
