import React, { useRef, useState, useContext, useEffect } from "react";
import css from "./item.module.css";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const Item = (props) => {
  const [price, setPrice] = useState(null);

  const prodctx = useContext(ProductReportHook);
  const inputref = useRef(price);
  console.log("prodctx", prodctx.minAmount);

  useEffect(() => {
    let aa = prodctx.minAmount[props.item.business_type_id];

    console.log("aa", aa);
    props.setData({ ...prodctx.minAmount });

    setPrice(prodctx.minAmount[props.item.business_type_id]);
  }, [props.item]);

  return (
    <div className={css.container}>
      <span>{props.item.business_type_name}</span>
      <input
        ref={inputref}
        value={price}
        onChange={(e) => {
          let aa = { ...props.data };
          aa[props.item.business_type_id] = parseInt(inputref.current.value);

          props.setData(aa);
          setPrice(e.target.value);
        }}
      />
    </div>
  );
};

export default Item;
