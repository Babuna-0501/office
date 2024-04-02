import React, { useRef, useEffect, useState } from "react";
import css from "./priceli.module.css";

const Priceli = (props) => {
  const [data, setData] = useState(null);
  const [zoneid, setZoneid] = useState(null);
  const [bustypeid, setBustypeid] = useState(null);
  const inputEl = useRef();
  // console.log("props prodict", props.product);
  useEffect(() => {
    setData(
      props.product.locations[props.onezoneid].price.channel[
        props.x.business_type_id
      ]
    );
    setBustypeid(props.x.business_type_id);
    setZoneid(props.onezoneid);
  }, [props]);
  const changeHandler = (e) => {
    console.log("clicked", e.target.value);
    setData(e.target.value);
    let aa = props.product;

    aa.locations[zoneid].price.channel[bustypeid] = Number(
      inputEl.current.value
    );

    props.setProduct(aa);
    console.log("aa", aa);
  };
  return (
    <li className={css.licontainer}>
      <span>{props.x.business_type_name}</span>{" "}
      <input value={data} onChange={changeHandler} ref={inputEl} type="text" />
    </li>
  );
};

export default Priceli;
