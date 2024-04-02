import React, { useContext } from "react";
import PromoHook from "../Hooks/PromoHook";
import css from "./productname.module.css";

const ProductName = (props) => {
  const promoctx = useContext(PromoHook);
  // console.log("props productname", props.data);
  const productHandler = () => {
    promoctx.setNewProd(false);
    promoctx.setProUpdate(true);
    promoctx.setUpdateDisProd(true);
    promoctx.setWillUpdateProd(props.data);
    promoctx.setSelectedRowData(null);
    promoctx.setProducts([]);
  };
  let aa = props.value.toString();
  return (
    <div
      onClick={productHandler}
      className={css.container}
      style={{ fontSize: "12px", color: "#37474F", fontWeight: "400" }}
    >
      {props.value ? aa : "Хямдралын нэр байхгүй."}
    </div>
  );
};

export default ProductName;
