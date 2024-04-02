import React, { useContext, useRef, useState, useEffect } from "react";
import css from "./channel.module.css";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const Channel = (props) => {
  const [data, setData] = useState(null);
  const priceref = useRef();

  const prodctx = useContext(ProductReportHook);
  useEffect(() => {
    setData(props.item.price);
  }, [props]);
  const ChangeHandler = (e) => {
    setData(e.target.value);
    console.log("e price", priceref.current.value);
    let aa = [...prodctx.bustype];
    aa.find((x) => x.business_type_id === props.item.business_type_id).price =
      Number(e.target.value);
    prodctx.setBustype(aa);
  };

  return (
    <div className={css.container}>
      <span>{props.item.business_type_name}</span>
      <input ref={priceref} value={data} onChange={ChangeHandler} />
    </div>
  );
};

export default Channel;
