import React, { useState, useContext, useEffect, useRef } from "react";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import css from "./deliveryfee.module.css";

const Deliveryfee = () => {
  const [data, setData] = useState([]);
  const priref = useRef();
  const prodctx = useContext(ProductReportHook);
  useEffect(() => {
    setData(prodctx.bustype);
  }, []);
  const ChangeHandler = (e, item) => {
    setData(e.target.value);
    console.log("e price", priref.current.value);
    let aa = [...prodctx.bustype];
    aa.find((x) => x.business_type_id === item.business_type_id).deliver_fee =
      Number(e.target.value);
    setData(aa);
    prodctx.setBustype(aa);
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {data &&
        data.map((item, index) => {
          return (
            <div key={item.business_type_id} className={css.wrapper}>
              <span>{item.business_type_name}</span>
              <input
                ref={priref}
                value={item.deliver_fee}
                onChange={(e) => ChangeHandler(e, item)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Deliveryfee;
